document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('#mobile-menu-button');
    const mobileMenu = document.querySelector('#mobile-menu');
    const header = document.querySelector('header');

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('shadow-lg');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('-translate-y-full')) {
            // Scroll Down
            header.classList.add('-translate-y-full');
        } else if (currentScroll < lastScroll && header.classList.contains('-translate-y-full')) {
            // Scroll Up
            header.classList.remove('-translate-y-full');
        }

        header.classList.add('shadow-lg');
        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('flex')) {
                    mobileMenuButton.click();
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                entry.target.classList.remove('opacity-0');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.classList.add('opacity-0');
        observer.observe(el);
    });

    // Add animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
});
