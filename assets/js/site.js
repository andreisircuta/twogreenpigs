// Two Green Pigs site: small touches that the pages work without (the links open the full images, the loops show their
// posters). No trackers, no cookies.
(function () {
  "use strict";

  // the year in the footer
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  // Silent loops (data-loop) play only while they are on screen, and never when the visitor asked for less motion:
  // four 1080p videos playing out of sight would only waste the battery.
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var loops = document.querySelectorAll("video[data-loop]");
  if (!still && "IntersectionObserver" in window) {
    var watch = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (v.preload === "none") { v.preload = "auto"; }
          var p = v.play();
          if (p && p.catch) { p.catch(function () { /* autoplay refused: the poster stays */ }); }
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    loops.forEach(function (v) { watch.observe(v); });
  }

  // YouTube videos (data-youtube): the poster and a play button until it is pressed, then the player in its place
  // (youtube-nocookie.com, playing at once). Nothing is asked of YouTube before that click.
  document.querySelectorAll("[data-youtube]").forEach(function (box) {
    var link = box.querySelector(".yt-play");
    if (!link) { return; }
    link.addEventListener("click", function (ev) {
      ev.preventDefault();
      var player = document.createElement("iframe");
      player.src = "https://www.youtube-nocookie.com/embed/" + box.getAttribute("data-youtube") + "?autoplay=1&rel=0&playsinline=1";
      player.title = box.getAttribute("data-title") || "Video";
      player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      player.allowFullscreen = true;
      player.referrerPolicy = "strict-origin-when-cross-origin";
      box.replaceChildren(player);
      player.focus();
    });
  });

  // The screenshot viewer: the gallery's links open a dialog with arrows, swipes and Esc instead of leaving the page.
  var gallery = document.querySelector("[data-gallery]");
  if (!gallery || typeof HTMLDialogElement !== "function") { return; }
  var links = Array.prototype.slice.call(gallery.querySelectorAll("a"));
  var box = document.createElement("dialog");
  box.className = "lightbox";
  box.setAttribute("aria-label", "Screenshot viewer");
  box.innerHTML =
    '<div class="lightbox-inner">' +
    '<img alt="">' +
    '<button type="button" class="lb-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lb-prev" aria-label="Previous screenshot">&#8249;</button>' +
    '<button type="button" class="lb-next" aria-label="Next screenshot">&#8250;</button>' +
    '<div class="lb-count" aria-live="polite"></div>' +
    "</div>";
  document.body.appendChild(box);
  var img = box.querySelector("img");
  var count = box.querySelector(".lb-count");
  var at = 0;

  function show(i) {
    at = (i + links.length) % links.length;
    var a = links[at];
    img.src = a.getAttribute("href");
    img.alt = (a.querySelector("img") || {}).alt || "";
    count.textContent = (at + 1) + " / " + links.length;
  }

  links.forEach(function (a, i) {
    a.addEventListener("click", function (ev) {
      ev.preventDefault();
      show(i);
      box.showModal();
    });
  });
  box.querySelector(".lb-close").addEventListener("click", function () { box.close(); });
  box.querySelector(".lb-prev").addEventListener("click", function () { show(at - 1); });
  box.querySelector(".lb-next").addEventListener("click", function () { show(at + 1); });
  box.addEventListener("click", function (ev) { if (ev.target === box || ev.target.classList.contains("lightbox-inner")) { box.close(); } });
  box.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowLeft") { show(at - 1); }
    else if (ev.key === "ArrowRight") { show(at + 1); }
  });

  var startX = null;
  box.addEventListener("touchstart", function (ev) { startX = ev.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (ev) {
    if (startX === null) { return; }
    var dx = ev.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { show(at + (dx < 0 ? 1 : -1)); }
    startX = null;
  });
})();
