/* ========================================
   BlackjackOnlineCasinos.com — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    /* ----- Burger Menu ----- */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Закрывать меню при клике на ссылку (кроме кнопки дропдауна)
        nav.querySelectorAll('.nav__link:not(.nav__dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    /* ----- Dropdown Toggle (mobile) ----- */
    const dropdownToggles = document.querySelectorAll('.nav__dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = toggle.closest('.nav__dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });

    /* ----- Header scroll effect ----- */
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.borderBottomColor = 'rgba(212, 168, 67, 0.15)';
        } else {
            header.style.borderBottomColor = 'var(--color-border)';
        }

        lastScroll = currentScroll;
    });

    /* ----- Header compact on scroll (add shadow) ----- */
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    /* ----- Ticker Pause ----- */
    const tickerTrack = document.getElementById('tickerTrack');
    const tickerPause = document.getElementById('tickerPause');

    if (tickerPause && tickerTrack) {
        tickerPause.addEventListener('click', () => {
            const isPaused = tickerTrack.classList.toggle('paused');
            const icon = tickerPause.querySelector('i');
            if (icon) {
                icon.className = isPaused ? 'fas fa-play' : 'fas fa-pause';
            }
            tickerPause.setAttribute('aria-label', isPaused ? 'Play ticker' : 'Pause ticker');
        });
    }

    /* ----- Casino Ticker Pause ----- */
    const casinoTrack = document.getElementById('casinoTickerTrack');
    const casinoPause = document.getElementById('casinoTickerPause');

    if (casinoPause && casinoTrack) {
        casinoPause.addEventListener('click', () => {
            const isPaused = casinoTrack.classList.toggle('paused');
            const icon = casinoPause.querySelector('i');
            if (icon) {
                icon.className = isPaused ? 'fas fa-play' : 'fas fa-pause';
            }
            casinoPause.setAttribute('aria-label', isPaused ? 'Play' : 'Pause');
        });
    }

    /* ===== Scroll-triggered animations (Intersection Observer) ===== */
    const animateElements = document.querySelectorAll('.animate-deal, .animate-chip, .animate-scale, .animate-slide-left, .animate-slide-right, .animate-count');

    if ('IntersectionObserver' in window && animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation by re-adding the class
                    const el = entry.target;
                    const animClass = Array.from(el.classList).find(c =>
                        c.startsWith('animate-')
                    );
                    if (animClass) {
                        el.style.opacity = '0';
                        el.classList.remove(animClass);
                        requestAnimationFrame(() => {
                            el.classList.add(animClass);
                            el.style.opacity = '';
                        });
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: just make everything visible
        animateElements.forEach(el => { el.style.opacity = ''; });
    }

    /* ===== Floating sparkle cursor effect ===== */
    const heroVisual = document.querySelector('.hero__visual');
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const sparkle = document.createElement('i');
            sparkle.className = 'fas fa-star';
            sparkle.style.cssText = `
                position: absolute; pointer-events: none; z-index: 10;
                left: ${e.offsetX}px; top: ${e.offsetY}px;
                font-size: 10px; color: #d4a843;
                opacity: 0.8; transition: all 0.8s ease;
                transform: translate(-50%, -50%) scale(0.5);
            `;
            heroVisual.appendChild(sparkle);
            requestAnimationFrame(() => {
                sparkle.style.opacity = '0';
                sparkle.style.transform = 'translate(-50%, -50%) scale(1.5) translateY(-30px)';
            });
            setTimeout(() => sparkle.remove(), 800);
        });
    }

    /* ===== Number counter animation on stat cards ===== */
    const statNumbers = document.querySelectorAll('.stat-card__number');
    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent || '';
                    const numMatch = text.match(/(\d+)/);
                    if (numMatch) {
                        const targetNum = parseInt(numMatch[1]);
                        if (targetNum <= 1000) {
                            let current = 0;
                            const step = Math.ceil(targetNum / 30);
                            const timer = setInterval(() => {
                                current += step;
                                if (current >= targetNum) {
                                    current = targetNum;
                                    clearInterval(timer);
                                }
                                el.textContent = text.replace(/\d+/, current.toString());
                            }, 40);
                        }
                    }
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => countObserver.observe(el));
    }

    /* ===== Card flip effect on category cards ===== */
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-card__icon i');
            if (icon && !icon.classList.contains('animate-suit')) {
                icon.style.transition = 'transform 0.6s ease';
                icon.style.transform = 'rotateY(360deg)';
                setTimeout(() => { icon.style.transform = ''; }, 600);
            }
        });
    });

    /* ----- Review Form ----- */
    const reviewForm = document.getElementById('reviewForm');
    const reviewSuccess = document.getElementById('reviewSuccess');

    if (reviewForm && reviewSuccess) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewName').value.trim();
            const message = document.getElementById('reviewMessage').value.trim();

            if (!name || !message) return;

            // Save to localStorage
            const reviews = JSON.parse(localStorage.getItem('bjReviews') || '[]');
            reviews.push({ name, message, date: new Date().toISOString() });
            localStorage.setItem('bjReviews', JSON.stringify(reviews));

            // Show success
            reviewForm.reset();
            reviewForm.style.display = 'none';
            reviewSuccess.style.display = 'block';
        });
    }
});
