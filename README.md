# NoteSwap

## Why I built this

Every semester I end up with a stack of my own notes — written while studying for my
own exams — and friends asking if I have notes for a course they're behind on. I'd
just send a photo over chat and it would get buried in three days. On the flip side,
when I didn't have notes for something, I had no easy way to find someone who did.

NoteSwap is my attempt at fixing that properly: a place where I can upload the notes
I've already written so my friends can grab them instead of asking me one at a time,
and where, for the courses I don't have notes for, someone else can upload theirs and
I can just go read them. Same idea either direction — whoever has the notes shares
them, whoever needs them finds them.

## This is a v1 — a mock, not a working product

Nothing here talks to a server. There's no database, no real accounts, and no file
upload yet. Login, sign up, password recovery, checkout and the contact form all
validate what you type and then say "this is a demo" instead of doing anything real.
The note pages you can browse (`note.html`) are one set of scanned pages I uploaded
manually to prove out the page design, not a working upload pipeline.

I'm building this out further from here. The plan for the next version:

- A real backend and database, so accounts, uploads and downloads actually work
- File upload for notes (PDF/image), not hand-placed scans
- Real search and filtering across subjects, universities and semesters
- Accounts tied to real login, so "my uploads" and "my downloads" mean something
- Replacing the placeholder providers, reviews and courses with real data

Everything below documents what v1 actually is, so picking this back up later (or
handing it to someone else) doesn't mean re-discovering it from scratch.

## Folder structure

```
.
├── index.html               Home / landing page
├── 404.html                 Not-found page
├── about.html               About us + note providers + reviews
├── our-story.html           Team story page
├── notes.html               Note listing
├── note.html                Single note viewer
├── contact.html             Contact form
├── login.html               Sign in
├── signup.html              Sign up
├── recover-password.html    Password recovery
├── pricing.html             Premium plan comparison
├── payment.html             Checkout
├── terms.html               Terms of use
│
├── assets/
│   ├── css/style.css        All styling for every page
│   ├── js/layout.js         The shared header and footer markup
│   ├── js/main.js           Preloader, navbar toggle, Swiper sliders, accordion
│   └── img/                 Site imagery (logos, illustrations, hero photos)
│
├── content/
│   └── notes/automata/      Scanned note pages served by note.html
│
├── robots.txt               Crawler rules
├── sitemap.xml              Page list (needs absolute URLs before launch)
└── .vscode/settings.json    Live Server port
```

`assets/` holds anything that makes the site *look* the way it does.
`content/` holds the actual study material the site exists to serve.

No build step — open `index.html` in a browser, or use the VS Code **Live Server**
extension (port is set in `.vscode/settings.json`).

## Shared header and footer

The header and footer live in one place — `assets/js/layout.js` — and are injected
into every page. Each page carries only two placeholders:

```html
<body>
    <div id="site-header"></div>
    ...page content...
    <div id="site-footer"></div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11.2.10/swiper-bundle.min.js" integrity="..." crossorigin="anonymous"></script>
    <script src="assets/js/layout.js"></script>
    <script src="assets/js/main.js"></script>
</body>
```

**To change the nav or footer, edit `layout.js` — never the individual pages.**

Notes on how it works:

- `layout.js` must load **before** `main.js`. It runs immediately rather than waiting
  for `DOMContentLoaded`, so the header exists by the time `main.js` binds the
  `#menu-btn` / `#close-navbar` handlers.
- It replaces the placeholder with `outerHTML` rather than filling it with `innerHTML`.
  That keeps `.header` a direct child of `<body>`, which its `position: sticky` needs.
- The nav link for the current page is marked `aria-current="page"` and styled by
  `.header .navbar a[aria-current="page"]`. It does **not** use `class="active"` —
  that name is already taken by the mobile navbar slide-in (`.header .active`).
- It compares page names, not full paths, so the highlight works whether the host
  serves `/about.html` or the extensionless `/about` (e.g. Vercel's `cleanUrls`).

Tradeoff: because the header and footer are injected by JavaScript, they are invisible
to search engine crawlers that do not run JS, and they render a fraction of a second
after the rest of the page. Acceptable for a mock; revisit if this goes to production —
a real backend in the next version would be a natural place to render these server-side
instead.

## Conventions

- **File names** are lowercase kebab-case, no spaces or parentheses — `folded-books.jpg`,
  not `folded books.jpg`. Spaces in paths need escaping in CSS `url()` and encoding in URLs.
- **Page names** describe what the page *is*. A page titled "Sign-Up" is `signup.html`.
- **HTML** uses 4-space indent, and each major block is wrapped in a matching comment pair:
  ```html
  <!--Subject-->
  <section class="subjects"> ... </section>
  <!--Subject-->
  ```
- **Every page** has exactly one `<h1>`, section headings are `<h2>`, card headings are
  `<h3>`. Page content sits inside `<main id="main">` so the skip link has a target.
- **Forms** are real `<form>` elements. Every control has a `<label>` (use `.sr-only` when
  the label should not be visible), and a `<span class="field-error" data-error-for="ID">`
  for its validation message. Add `data-demo-form="message"` and `main.js` handles
  validation and the demo response.
- **Icons** are decorative, so they carry `aria-hidden="true"`. An icon-only link or
  button needs an `aria-label` describing what it does.
- **Images** carry `width`/`height` to stop the page jumping as they load, plus
  `loading="lazy"` below the fold. `alt=""` is correct for decoration; describe the image
  only when it carries information.
- **CSS** uses the design tokens in `:root` (`--green`, `--black`, `--box-shadow`,
  `--border`, …) rather than raw hex values. Root font size is `62.5%`, so `1rem` = `10px`.
- **Class naming** is a loose parent/child pattern: `.footer .box-container .box .link`.
- **Buttons styled as `.btn`** should only ever get `font-family` from the element
  selector (`button.btn`). Don't add a `background` there — an element-qualified
  selector outranks the plain button classes (`.log-btn`, `.signup-btn`, etc.) that
  actually set the button's color, and silently wins over them.

## Third-party

Loaded from CDN in every page's `<head>`:

- Font Awesome 6.6.0 (icons)
- Swiper 11.2.10 (sliders)
- Google Fonts — Nunito, Rubik

All three are pinned to an exact version and carry a Subresource Integrity hash, so the
browser refuses the file if a CDN ever serves different bytes. **If you change a CDN
version you must recompute its `integrity` hash**, or the asset will silently fail to
load:

```sh
curl -s <url> | openssl dgst -sha384 -binary | openssl base64 -A
```

Fonts load via `<link>` with `preconnect`, not a CSS `@import`, because an `@import`
blocks the stylesheet from being parsed until the font CSS arrives.

## Deploying

There is no build step, so any static host works. On Vercel: import the repo and deploy
with the default settings. Leave the framework preset as **Other**, and leave the build
command and output directory empty - the repo root is what gets served.

Verified locally over HTTP: every page returns 200, `/` serves `index.html`, unknown
paths fall through to `404.html`, and no filename depends on case (Windows ignores case,
Linux does not, so a wrong-case reference would work locally and 404 in production).

`cleanUrls` is safe to turn on. The nav highlight normalises the path, so it works
whether the host serves `/about.html` or `/about`.

After the first deploy, fill in the real domain in three places, or link previews and
search indexing stay broken:

- `og:image` and `og:url` in every page's `<head>` - Open Graph needs absolute URLs
- `<loc>` entries in `sitemap.xml`
- the `Sitemap:` line in `robots.txt`

## Known gaps

Everything below is deliberate for a v1 mock, not an oversight — see "This is a v1"
above for what fixing these actually looks like.

**No backend.** Login, signup, password recovery, checkout, the contact form and the
footer subscribe box all validate in the browser and then report that this is a demo.
Nothing is sent anywhere and no account or payment is created. `payment.html` carries a
visible demo notice; do not enter a real card number.

**No real upload.** The one set of notes you can actually browse (`note.html`) is a
folder of scans I placed by hand. There's no upload form that does anything yet.

**Social links point to `#`.** There are no real NoteSwap social accounts yet. The links
carry proper `aria-label`s so screen readers announce them, but they go nowhere.

**Header and footer are injected by JavaScript.** Crawlers that do not run JS will not
see them. Fine for a mock; revisit before production (see "Shared header and footer").

**`og:url`, `og:image` and the sitemap need a real domain.** Canonical links and
`sitemap.xml` currently use relative paths. Open Graph images must be absolute URLs to
work, so link previews will not show an image until the domain is filled in.

**Font Awesome loads in full** for about 20 icons. Subsetting needs a build step.

**One stylesheet for every page.** `style.css` is about 2,700 lines. It has a table of
contents and section banners, and 367 lines of dead rules were removed. Splitting it
per page would cut what each page downloads, but at this size the saving is small and
the risk of moving a rule into the wrong file is not. Worth doing if it keeps growing.
