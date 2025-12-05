document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu
    mobileToggle?.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Newsletter
    const form = document.querySelector('.newsletter-form');
    form?.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input').value.trim();
        if (email) {
            this.innerHTML = `<div class="success-message">Thank you! You're subscribed.</div>`;
        }
    });

    // Animate stats
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat h3').forEach(el => {
                    const target = parseInt(el.textContent);
                    animateCounter(el, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (statsSection) statsObserver.observe(statsSection);

    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.textContent = target + '+';
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Trigger text reveal animations
    document.querySelectorAll('.text-reveal span').forEach((span, i) => {
        span.style.animationDelay = `${i * 0.3}s`;
    });
});