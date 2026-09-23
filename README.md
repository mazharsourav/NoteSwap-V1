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
