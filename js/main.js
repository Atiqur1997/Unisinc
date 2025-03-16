document.addEventListener('DOMContentLoaded', function() {
    // Preloader with smooth fade
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    });

    // Mobile menu with smooth transitions
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            requestAnimationFrame(() => {
                mobileMenu.classList.toggle('active');
                menuToggle.querySelector('i').classList.toggle('fa-bars');
                menuToggle.querySelector('i').classList.toggle('fa-times');
            });
        });

        // Smooth mobile menu closing
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                requestAnimationFrame(() => {
                    mobileMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                });
            });
        });

        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                requestAnimationFrame(() => {
                    mobileMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                });
            }
        });
    }

    // Enhanced stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '50px'
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2500;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    
                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    
                    requestAnimationFrame(updateCount);
                    statsObserver.unobserve(stat);
                }
            });
        }, observerOptions);

        stats.forEach(stat => statsObserver.observe(stat));
    }

    // Enhanced smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimized navbar scroll effect
    const nav = document.querySelector('.nav');
    if (nav) {
        let lastScroll = 0;
        let ticking = false;
        const scrollThreshold = 5;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    
                    if (Math.abs(currentScroll - lastScroll) < scrollThreshold) {
                        ticking = false;
                        return;
                    }
                    
                    if (currentScroll <= 0) {
                        nav.classList.remove('scroll-up', 'scroll-down');
                    } else if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
                        nav.classList.remove('scroll-up');
                        nav.classList.add('scroll-down');
                    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
                        nav.classList.remove('scroll-down');
                        nav.classList.add('scroll-up');
                    }
                    
                    lastScroll = currentScroll;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Enhanced AOS initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            once: true,
            mirror: false,
            offset: 50,
            delay: 100,
            anchorPlacement: 'top-bottom'
        });
    }

    // Optimized scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    document.body.style.setProperty('--scroll', scrolled);
                });
            }, 10);
        }
    }, { passive: true });
});