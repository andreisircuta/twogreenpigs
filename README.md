# Two Green Pigs — website

The studio's site: the studio page (`index.html`) and one page per game (`desert-clash/`). Plain HTML and CSS, no
build step, no cookies, no trackers and no requests to other sites (fonts are the visitor's own), so it needs no
cookie banner. The trailer and the vertical clip play from YouTube, which loads only when the visitor presses play. It is a separate project from the Unity game: its own git repository, ignored by the game's.

```
index.html                 the studio: hero, games, about, contact
desert-clash/index.html    Desert Clash: trailer, how it plays, factions, features, screenshots, phone, fact sheet
desert-clash/media/        the game's images and the factions' silent loops, sized for the web
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

## The address

The site is at https://andreisircuta.github.io/twogreenpigs/ (a project site, under `/twogreenpigs/`). If it moves (its
own domain, another repository), change these:

- `<base href="/twogreenpigs/">` in `404.html` (GitHub Pages shows that page for a missing address at any depth);
- `og:url` and `og:image` in the two pages (social previews need full addresses).

## Changing things

- Texts: straight in the HTML files.
- The trailer and the vertical clip: their YouTube IDs are in `data-youtube` and in the links next to them
  (trailer `YF86s-rRHUo`, clip `3Na1lm7YS8w`). A new upload only changes those.
- The factions' loops come from the game's recordings: in the Unity project,
  `Game.Marketing.Trailer.Loop("horde", @"<full path>\loop-horde.mp4")` (960x540, about 3.5 MB). Keep their bit rate:
  the first web copies, at a tenth of it, came out blocky.
- Pictures: the screenshots are 1920×1080 JPEGs plus 800×450 thumbnails (`-thumb`).

## Still to add

- The privacy policy page for Desert Clash (the draft is in the game's `Docs/PrivacyPolicy.md`; it needs the legal
  name, the address, the retention periods and the data region first). Google Play asks for its address when the app
  is listed.
- The Steam and Google Play buttons when the store pages exist.
