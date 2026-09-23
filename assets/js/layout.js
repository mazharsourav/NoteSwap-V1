// Shared header and footer for every page.
// Edit the markup here once and all pages pick it up - each page only holds
// a <div id="site-header"></div> and a <div id="site-footer"></div> placeholder.

const siteHeader = `
    <a href="#main" class="skip-link">Skip to main content</a>
    <header class="header">
        <a href="index.html" class="logo"><i class="fa-solid fa-book" aria-hidden="true"></i> NoteSwap</a>
        <nav class="navbar" id="navbar" aria-label="Main">
            <button id="close-navbar" class="fas fa-times" aria-label="Close menu"></button>
            <a href="index.html">Home</a>
            <a href="notes.html">Notes</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </nav>
        <div class="icons">
            <a href="login.html" id="account-btn" class="fas fa-user" aria-label="Log in to your account"></a>
            <button id="menu-btn" class="fas fa-bars" aria-label="Open menu" aria-expanded="false" aria-controls="navbar"></button>
        </div>
    </header>
`;

const siteFooter = `
    <footer class="footer">
        <div class="box-container">
            <div class="box">
                <h3><i class="fa-solid fa-book" aria-hidden="true"></i> <span class="brand">NoteSwap</span></h3>
                <p>Share, exchange, and access notes easily. Simplify your study process with collaborative tools.</p>
                <div class="share">
                    <a href="#" aria-label="NoteSwap on Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
                    <a href="#" aria-label="NoteSwap on Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                    <a href="#" aria-label="NoteSwap on Twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a>
                    <a href="#" aria-label="NoteSwap on LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="box">
                <h3>Quick Links</h3>
                <a href="index.html" class="link">Home</a>
                <a href="notes.html" class="link">Notes</a>
                <a href="about.html" class="link">About</a>
                <a href="contact.html" class="link">Contact</a>
            </div>
            <div class="box">
                <h3>Useful Links</h3>
                <a href="our-story.html" class="link">Our Story</a>
                <a href="pricing.html" class="link">Pricing</a>
                <a href="contact.html" class="link">Help Center</a>
                <a href="terms.html" class="link">Terms of Use</a>
            </div>
            <div class="box">
                <h3>Service</h3>
                <p>Subscribe for Premium Service</p>
                <form class="subscribe-form" data-demo-form novalidate>
                    <label for="subscribe-email" class="sr-only">Your email address</label>
                    <input type="email" id="subscribe-email" name="email" placeholder="enter your email" class="email" required>
                    <button type="submit" class="btn">Subscribe</button>
                    <p class="form-message" role="status"></p>
                </form>
            </div>
        </div>
        <div class="credit">Created By <span><a href="index.html">NoteSwap Inc.</a></span> | All Right Reserved !</div>
    </footer>
`;

// Marks the nav link for the page we are on.
// Uses aria-current instead of a class because .header .active is already
// taken by the mobile navbar slide-in.
const markCurrentPage = () => {
    // Reduces a path to a bare page name, so this works whether the host
    // serves "/about.html" or the extensionless "/about" that Vercel's
    // cleanUrls setting (and similar hosts) produce.
    const pageName = path => {
        const last = path.split('/').pop().replace(/\.html$/, '');
        return last === '' ? 'index' : last;
    };

    const current = pageName(window.location.pathname);

    document.querySelectorAll('.header .navbar a').forEach(link => {
        if (pageName(link.getAttribute('href')) === current) {
            link.setAttribute('aria-current', 'page');
        }
    });
};

// Swaps the placeholders for the real markup.
// outerHTML replaces the placeholder div rather than filling it, so .header
// stays a direct child of <body> and its position: sticky keeps working.
const loadLayout = () => {
    const headerSlot = document.querySelector('#site-header');
    const footerSlot = document.querySelector('#site-footer');

    if (headerSlot) {
        headerSlot.outerHTML = siteHeader;
    }

    if (footerSlot) {
        footerSlot.outerHTML = siteFooter;
    }

    markCurrentPage();
};

// Runs straight away. This script sits at the end of <body>, so the
// placeholders are already parsed, and the header exists before main.js
// binds its menu handlers on DOMContentLoaded.
loadLayout();
