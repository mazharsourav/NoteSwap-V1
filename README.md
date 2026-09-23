# NoteSwap

A static site for sharing and exchanging study notes. No build step — open `index.html`
in a browser, or use the VS Code **Live Server** extension (configured for port 5501).

## Folder structure

```
.
├── index.html               Home / landing page
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
└── .vscode/settings.json    Live Server port
```

`assets/` holds anything that makes the site *look* the way it does.
`content/` holds the actual study material the site exists to serve.

## Shared header and footer

The header and footer live in one place — `assets/js/layout.js` — and are injected
into every page. Each page carries only two placeholders:

```html
<body>
    <div id="site-header"></div>
    ...page content...
    <div id="site-footer"></div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
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

Tradeoff: because the header and footer are injected by JavaScript, they are invisible
to search engine crawlers that do not run JS, and they render a fraction of a second
after the rest of the page. Acceptable for a mock; revisit if this goes to production.

## Conventions

- **File names** are lowercase kebab-case, no spaces or parentheses — `folded-books.jpg`,
  not `folded books.jpg`. Spaces in paths need escaping in CSS `url()` and encoding in URLs.
- **Page names** describe what the page *is*. A page titled "Sign-Up" is `signup.html`.
- **HTML** uses 4-space indent, and each major block is wrapped in a matching comment pair:
  ```html
  <!--Header-->
  <header class="header"> ... </header>
  <!--Header-->
  ```
- **CSS** uses the design tokens in `:root` (`--green`, `--black`, `--box-shadow`,
  `--border`, …) rather than raw hex values. Root font size is `62.5%`, so `1rem` = `10px`.
- **Class naming** is a loose parent/child pattern: `.footer .box-container .box .link`.

## Third-party

Loaded from CDN in every page's `<head>`:

- Font Awesome 6.6.0 (icons)
- Swiper 11 (sliders)
- Google Fonts — Nunito, Rubik (imported at the top of `style.css`)

## Known gaps

Pages referenced by links but not yet built:

- `course-details.html` — linked 3× from the Featured section on `index.html`
- `membership.html` — linked from the Premium Membership teaser
- `instructors.html` — linked from the "See More" button

Images referenced but missing from `assets/img/`:

- `teacher1.jpg`, `teacher2.jpg`, `teacher3.jpg` — instructor cards on `index.html`
- `dev-backend.png`, `dev-frontend.png`, `dev-uiux.png` — team cards on `our-story.html`
- `png/paypal.png`, `png/apple.png`, `png/google.png` — payment icons on `payment.html`
  (the whole `png/` folder is absent)

Pages that exist but nothing links to: `pricing.html`, `payment.html`, `our-story.html`.

Images currently in `assets/img/` that no page uses: `bg.gif`, `book-stack.png`,
`diary.svg`, `girl-graduation.svg`, `information-button.png`, `learning.svg`,
`learning-desk.svg`, `make-it-rain.svg`, `mathematics-bro.svg`, `note-provider-man.jpg`,
`note-provider-woman.png`, `number-1.svg`, `number-2.svg`, `online-transactions.svg`,
`personal-finance.svg`.
