// Page behaviour: preloader, navbar, sliders, accordion, load more, and forms.
// The header and footer markup lives in layout.js, which runs before this file.

document.addEventListener('DOMContentLoaded', () => {

    // Preloader
    // Hidden as soon as the page has loaded, with no artificial delay.
    // style.css also has a CSS fallback that clears it if this never runs.
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        const hidePreloader = () => {
            preloader.style.display = 'none';
        };

        if (document.readyState === 'complete') {
            hidePreloader(); // the load event has already been and gone
        } else {
            window.addEventListener('load', hidePreloader);
        }
    }

    // Navbar toggle
    const navbar = document.querySelector('.header .navbar');
    const menuBtn = document.querySelector('#menu-btn');
    const closeNavbar = document.querySelector('#close-navbar');

    const openMenu = () => {
        navbar.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        navbar.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    };

    if (navbar && menuBtn && closeNavbar) {
        menuBtn.addEventListener('click', openMenu);
        closeNavbar.addEventListener('click', closeMenu);

        // Escape closes the mobile menu.
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && navbar.classList.contains('active')) {
                closeMenu();
                menuBtn.focus();
            }
        });

        // Following a link should close the menu behind it.
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Sliders
    // Each one is only started if that slider is actually on this page.
    if (document.querySelector('.home-slider')) {
        new Swiper('.home-slider', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            grabCursor: true,
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
            },
        });
    }

    if (document.querySelector('.teachers-slider')) {
        new Swiper('.teachers-slider', {
            loop: true,
            grabCursor: true,
            spaceBetween: 20,
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                991: { slidesPerView: 3 },
            },
        });
    }

    if (document.querySelector('.reviews-slider')) {
        new Swiper('.reviews-slider', {
            loop: true,
            grabCursor: true,
            spaceBetween: 20,
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                991: { slidesPerView: 3 },
            },
        });
    }

    // Accordion
    // Each heading is a real <button>, so aria-expanded has to be kept in step.
    const accordions = document.querySelectorAll('.faq .accordion-container .accordion');
    accordions.forEach(acco => {
        const heading = acco.querySelector('.accordion-heading');
        if (!heading) {
            return;
        }

        heading.addEventListener('click', () => {
            const wasActive = acco.classList.contains('active');

            // Close all of them first, then reopen this one if it was closed.
            accordions.forEach(other => {
                other.classList.remove('active');
                const otherHeading = other.querySelector('.accordion-heading');
                if (otherHeading) {
                    otherHeading.setAttribute('aria-expanded', 'false');
                }
            });

            if (!wasActive) {
                acco.classList.add('active');
                heading.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Load more notes
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            document.querySelectorAll('.courses .box.hide').forEach(box => {
                box.classList.remove('hide');
            });
            loadMoreBtn.style.display = 'none';
        });
    }

    // Forms
    // Nothing is wired to a server yet, so every form validates in the browser
    // and then reports that this is a demo instead of silently reloading.
    document.querySelectorAll('[data-demo-form]').forEach(form => {
        const message = form.querySelector('.form-message');

        form.addEventListener('submit', event => {
            event.preventDefault();

            if (!validateForm(form)) {
                return;
            }

            if (message) {
                message.classList.remove('is-error');
                message.textContent = form.dataset.demoForm ||
                    'Thanks. This is a demo site, so nothing was actually sent.';
            }
            form.reset();
        });
    });

});

// Checks a form and writes a message under any field that is not filled in
// correctly. Returns true when everything passes.
const validateForm = form => {
    let firstBad = null;

    form.querySelectorAll('[required]').forEach(field => {
        const error = form.querySelector(`[data-error-for="${field.id}"]`);
        let problem = '';

        if (field.type === 'checkbox' && !field.checked) {
            problem = 'Please tick this box to continue.';
        } else if (!field.value.trim()) {
            problem = 'Please fill this in.';
        } else if (!field.checkValidity()) {
            problem = field.type === 'email'
                ? 'Please enter a valid email address.'
                : 'Please check this value.';
        }

        // Password confirmation, when the field asks for it.
        if (!problem && field.dataset.mustMatch) {
            const other = form.querySelector(`#${field.dataset.mustMatch}`);
            if (other && other.value !== field.value) {
                problem = 'The two passwords do not match.';
            }
        }

        if (problem) {
            field.setAttribute('aria-invalid', 'true');
            if (error) {
                error.textContent = problem;
            }
            if (!firstBad) {
                firstBad = field;
            }
        } else {
            field.removeAttribute('aria-invalid');
            if (error) {
                error.textContent = '';
            }
        }
    });

    if (firstBad) {
        firstBad.focus();
        return false;
    }

    return true;
};
