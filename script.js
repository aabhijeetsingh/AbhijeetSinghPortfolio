document.addEventListener('DOMContentLoaded', () => {
    // Get all the necessary DOM elements
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const closeBtn = document.getElementById('close-btn');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // --- THEME TOGGLE --- //
    // This section handles the light and dark mode functionality.

    // Add a click event listener to the theme toggle button
    themeToggle.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body
        body.classList.toggle('dark-mode');
        // Update the theme toggle button icon
        themeToggle.querySelector('.toggle-icon').textContent =
            body.classList.contains('dark-mode') ? '☀' : '☽';
        // Save the user's theme preference to local storage
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Apply the saved theme when the page loads
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.querySelector('.toggle-icon').textContent = '☀';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.querySelector('.toggle-icon').textContent = '☽';
    }

    // --- HAMBURGER MENU --- //
    // This section handles the mobile navigation menu.

    // Add a click event listener to the hamburger menu button
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling when the menu is open
    });

    // Add a click event listener to the close button
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        body.style.overflow = ''; // Allow scrolling when the menu is closed
    });

    // Close the mobile menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = ''; // Allow scrolling
        });
    });

    // --- BACK TO TOP BUTTON --- //
    // This section handles the back to top button functionality.

    // Show or hide the back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });

    // Scroll to the top of the page when the button is clicked
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- SMOOTH SCROLLING --- //
    // This section handles smooth scrolling for anchor links.

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Check if the link is a valid anchor
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetPosition = targetElement.offsetTop - navbarHeight - 20;

                // Scroll to the target element with an offset
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- FORM VALIDATION --- //
    // This section handles basic form validation for the contact form.

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isFormValid = true;
            inputs.forEach(input => {
                const errorElement = document.getElementById(`${input.id}-error`);
                if (input.value.trim() === '') {
                    if (errorElement) {
                        errorElement.textContent = 'This field is required.';
                        errorElement.style.display = 'block';
                    }
                    isFormValid = false;
                } else {
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });

            // Prevent form submission if the form is not valid
            if (!isFormValid) {
                e.preventDefault();
            }
        });
    }
});
