// Shared header and footer for every page.
// Edit the markup here once and all pages pick it up - each page only holds
// a <div id="site-header"></div> and a <div id="site-footer"></div> placeholder.

const siteHeader = `
    <header class="header">
        <a href="index.html" class="logo"><i class="fa-duotone fa-solid fa-book"></i> NoteSwap</a>
        <nav class="navbar">
            <div id="close-navbar" class="fas fa-times"></div>
            <a href="index.html">Home</a>
            <a href="notes.html">Notes</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </nav>
        <div class="icons">
            <a href="login.html"><div id="account-btn" class="fas fa-user"></div></a>
            <div id="menu-btn" class="fas fa-bars"></div>
        </div>
    </header>
`;

const siteFooter = `
    <section class="footer">
        <div class="box-container">
            <div class="box">
                <h3><i class="fa-duotone fa-solid fa-book">     N o t e S w a p</i></h3>
                <p>Share, exchange, and access notes easily. Simplify your study process with collaborative tools.</p>
                <div class="share">
                <a href="#" class="fab fa-facebook-f"></a>
                <a href="#" class="fab fa-instagram"></a>
                <a href="#" class="fab fa-twitter"></a>
                <a href="#" class="fab fa-linkedin"></a>
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
                <a href="contact.html" class="link">Help Center</a>
                <a href="contact.html" class="link">Ask Question</a>
                <a href="contact.html" class="link">Send Feedback</a>
                <a href="terms.html" class="link">Terms of Use</a>
            </div>
            <div class="box">
                <h3>Service</h3>
                <p>Subscribe for Premium Service</p>
                <input type="email" name="" placeholder="enter your email" id="" class="email">
                <input type="submit" value="Subscribe" class="btn">
            </div>
        </div>
        <div class="credit">Created By <span><a href="index.html">NoteSwap Inc.</a></span> | All Right Reserved !</div>
    </section>
`;

// Marks the nav link for the page we are on.
// Uses aria-current instead of a class because .header .active is already
// taken by the mobile navbar slide-in.
const markCurrentPage = () => {
    let page = window.location.pathname.split('/').pop();
    if (page === '') {
        page = 'index.html'; // the server serves index.html for a bare "/"
    }

    document.querySelectorAll('.header .navbar a').forEach(link => {
        if (link.getAttribute('href') === page) {
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
