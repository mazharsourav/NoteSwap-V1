// Wait for DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Preloader Hide Function
    window.addEventListener('load', function () {
        setTimeout(function() {
            var preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none'; // Hides the preloader
            }
        }, 1500);  // Hide after 1.5 seconds
    });

    // Navbar toggle
    let navbar = document.querySelector('.header .navbar');
    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.add('active');
    };

    document.querySelector('#close-navbar').onclick = () => {
        navbar.classList.remove('active');
    };

    // Swiper initialization for home-slider
    var homeSwiper = new Swiper(".home-slider", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
        grabCursor: true,
    });

    // Initialize other Swipers for teachers and reviews
    var teachersSwiper = new Swiper('.teachers-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
        },
    });

    var reviewsSwiper = new Swiper('.reviews-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
        },
    });

    // Accordion functionality
    const accordions = document.querySelectorAll('.faq .accordion-container .accordion');
    accordions.forEach(acco => {
        acco.addEventListener('click', () => {
            const isActive = acco.classList.contains('active');
            // Close all accordions
            accordions.forEach(dino => {
                dino.classList.remove('active');
            });
            // Open clicked accordion
            if (!isActive) {
                acco.classList.add('active');
            }
        });
    });

    // Load more courses functionality
    document.querySelector('.load-more .btn').onclick = () => {
        document.querySelectorAll('.courses .box.hide').forEach(show => {
            show.style.display = 'block';
        });
        document.querySelector('.load-more .btn').style.display = 'none';
    };


});
