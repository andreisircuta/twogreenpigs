# Two Green Pigs — website

The studio's site: the studio page (`index.html`) and one page per game (`desert-clash/`). Plain HTML and CSS, no
build step, no cookies, no trackers and no requests to other sites (fonts are the visitor's own), so it needs no
cookie banner. It is a separate project from the Unity game: its own git repository, ignored by the game's.

```
index.html                 the studio: hero, games, about, contact
desert-clash/index.html    Desert Clash: trailer, how it plays, factions, features, screenshots, phone, fact sheet
desert-clash/media/        the game's images and videos, sized for the web
assets/css/site.css        all the styles (the studio is bright, a game page dark)
assets/js/site.js          the screenshot viewer and the faction loops (the pages work without it)
assets/img/                the studio's logo, mascots and icons
404.html                   GitHub Pages shows it for any missing address
.nojekyll                  tells GitHub Pages to serve the files as they are
```

## See it on this PC

```
python -m http.server 8765 --directory .
```

then open http://localhost:8765. (Opening `index.html` straight from the disk works too, except the faction videos in
some browsers.)

## Publish it on GitHub Pages

1. On GitHub, create a **public** repository (Pages on a private repository needs a paid plan). Two choices:
   - Named `<account>.github.io` (for example `twogreenpigs.github.io` under an account or organization called
     `twogreenpigs`): the site is at `https://<account>.github.io/`. Recommended: the 404 page expects the site at the
     root.
   - Any other name (`website`): the site is at `https://<account>.github.io/website/`.
2. Push this folder:
   ```
   git remote add origin https://github.com/<account>/<repository>.git
   git push -u origin main
   ```
3. On GitHub: the repository's **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`,
   folder `/ (root)`, Save. After a minute or two the address shows at the top of that page.
4. That address goes into the Google Play Console form (Website) and later into the store pages.

A domain of your own (for example `twogreenpigs.com`) can come later: buy it, add it under Settings → Pages → Custom
domain (GitHub writes a `CNAME` file) and point the domain's DNS at GitHub as their guide says.

## When the address is known

- The social previews (`og:image` in the two pages) work best with full addresses: replace `assets/img/social-preview.jpg`
  and `media/key-art.jpg` with `https://<address>/...`.

## Changing things

- Texts: straight in the HTML files.
- The videos come from the game's recordings, encoded smaller than the store versions (GitHub refuses files over
  100 MB): in the Unity project, `Game.Marketing.Trailer.Encode(music, 0f, @"<full path>.mp4", 0.08f)`,
  `Trailer.EncodeVertical(...)` the same way, and `Trailer.Loop("horde", @"<full path>.mp4")` for a faction loop.
- Pictures: the screenshots are 1920×1080 JPEGs plus 800×450 thumbnails (`-thumb`).

## Still to add

- The privacy policy page for Desert Clash (the draft is in the game's `Docs/PrivacyPolicy.md`; it needs the legal
  name, the address, the retention periods and the data region first). Google Play asks for its address when the app
  is listed.
- The Steam and Google Play buttons when the store pages exist.
