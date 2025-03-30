document.addEventListener('DOMContentLoaded', () => {
    // Scroll animation logic
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                // Check if the element is intersecting (visible)
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing the element after it becomes visible
                    observer.unobserve(entry.target);
                }
                // Optional: Add else condition here to remove 'is-visible' if you want animations to reverse when scrolling out
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        };

        // Create the Intersection Observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe each animated element
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        console.log("No elements to animate on scroll found.");
    }

    // Mobile menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create menu overlay element
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);

    // Toggle menu function
    const toggleMenu = () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    };

    // Event listeners for menu
    burgerMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on window resize (if desktop width is reached)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});