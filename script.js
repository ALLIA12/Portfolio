// No changes were needed in script.js for this request.
// It remains the same as provided previously.

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.createElement('div'); // Keep overlay logic
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);

    const themePreferenceKey = 'portfolio-theme-preference';

    // --- Theme Switching Logic ---
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            // Optional: Update meta theme color tag dynamically if needed
            // document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]').setAttribute('content', getComputedStyle(body).getPropertyValue('--light-bg-color').trim());
            // document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]').setAttribute('content', getComputedStyle(body).getPropertyValue('--light-bg-color').trim()); // Or set both to current
        } else {
            body.classList.remove('light-theme');
            // Optional: Update meta theme color tag dynamically
            // document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]').setAttribute('content', getComputedStyle(body).getPropertyValue('--bg-color').trim());
            // document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]').setAttribute('content', getComputedStyle(body).getPropertyValue('--bg-color').trim());
        }
    };

    const toggleTheme = () => {
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem(themePreferenceKey, newTheme);
    };

    // Load saved theme on startup
    const savedTheme = localStorage.getItem(themePreferenceKey);
    // If no preference saved, you could check system preference:
    // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    // Or just default to dark if nothing is saved:
    const initialTheme = savedTheme || 'dark';
    applyTheme(initialTheme);

    // Add event listener for the theme toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    } else {
        console.warn("Theme toggle button not found.");
    }

    // --- Scroll Animation Logic ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger animation when 10% of the element is visible
        };
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(el => observer.observe(el));
    } else {
        console.log("No elements to animate on scroll found.");
    }

    // --- Mobile Menu Functionality ---
    const toggleMenu = () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    };

    // Event listeners for menu
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu); // Close on overlay click

        // Close menu when clicking a nav link
        const navItems = navLinks.querySelectorAll('li a');
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
    } else {
         console.warn("Burger menu or nav links not found.");
    }
});