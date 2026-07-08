/* ========================================
   BlackjackOnlineCasinos.com — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    /* ===== INIT Player Profile & Mastery Dashboard ===== */
    try {
        if (typeof PlayerProfile !== 'undefined') {
            if (typeof MasteryDashboard !== 'undefined') {
                MasteryDashboard.init();
            } else {
                PlayerProfile.init();
            }
        }
    } catch (e) {
        console.warn('PlayerProfile init error:', e);
    }

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


    /* ===== Game Launcher (inline iframe) — auto-inject if missing ===== */
    function initGameLauncher() {
        let launcher = document.getElementById('gameLauncher');
        let iframe = document.getElementById('gameLauncherIframe');
        let titleEl = document.getElementById('gameLauncherTitle');
        let closeBtn = document.getElementById('gameLauncherClose');

        // Если на странице нет game launcher — инжектим его перед футером
        if (!launcher) {
            const main = document.querySelector('main');
            const footer = document.querySelector('.footer');
            const insertBefore = footer || document.body.lastElementChild;

            launcher = document.createElement('section');
            launcher.className = 'game-launcher';
            launcher.id = 'gameLauncher';
            launcher.innerHTML = `
                <div class="container">
                    <div class="game-launcher__header">
                        <h2 class="game-launcher__title" id="gameLauncherTitle">Game</h2>
                        <button class="game-launcher__close" id="gameLauncherClose" aria-label="Close game">
                            <i class="fas fa-times"></i> Close <span class="hide-mobile">Game</span>
                        </button>
                    </div>
                    <div class="game-launcher__frame">
                        <iframe id="gameLauncherIframe" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            insertBefore.parentNode.insertBefore(launcher, insertBefore);

            iframe = document.getElementById('gameLauncherIframe');
            titleEl = document.getElementById('gameLauncherTitle');
            closeBtn = document.getElementById('gameLauncherClose');
        }

        window.launchGame = function(url, title) {
            if (!launcher || !iframe) return;
            iframe.src = url;
            if (titleEl && title) {
                titleEl.textContent = title;
            }
            // Закрыть бургер-меню если открыто
            if (burger) {
                burger.classList.remove('active');
                nav.classList.remove('active');
            }
            // Показать секцию (перекрываем CSS display:none)
            launcher.style.display = 'block';
            // Плавный скролл
            setTimeout(() => {
                launcher.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        };

        window.closeGame = function() {
            if (!launcher || !iframe) return;
            iframe.src = '';
            launcher.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', window.closeGame);
        }
    }

    initGameLauncher();

    // Intercept game links (data-launch-game attribute)
    document.addEventListener('click', function(e) {
        const link = e.target.closest('[data-launch-game]');
        if (!link) return;
        e.preventDefault();
        const url = link.getAttribute('data-launch-game');
        const title = link.getAttribute('data-launch-title') || 'Game';
        if (typeof launchGame === 'function') {
            launchGame(url, title);
        }
    });

    /* ===== Fallback for broken casino logos ===== */
    function createCasinoFallback(img) {
        const wrap = img.closest('.ticker-casino__logo-wrap, .casino-card__left');
        if (!wrap) return;

        // Create a placeholder div
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            display: flex; align-items: center; justify-content: center;
            width: 100%; height: 100%;
            min-height: 60px;
            background: linear-gradient(135deg, #1a1e27, #232833);
            border-radius: 8px;
            border: 1px solid rgba(212, 168, 67, 0.15);
        `;

        const icon = document.createElement('i');
        icon.className = 'fas fa-chess-king';
        icon.style.cssText = 'font-size:2rem;color:var(--color-gold);opacity:0.6;';
        placeholder.appendChild(icon);

        img.style.display = 'none';
        wrap.appendChild(placeholder);
    }

    document.querySelectorAll('.ticker-casino__logo, .casino-card__logo').forEach(img => {
        img.addEventListener('error', function() {
            createCasinoFallback(this);
        });
        if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
            createCasinoFallback(img);
        }
    });

    /* ----- Service Worker Registration (PWA) with force update ----- */
    if ('serviceWorker' in navigator) {
        // Force unregister old service workers for cache busting
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(reg => reg.unregister());
        });
        // Register new one with cache-busting
        navigator.serviceWorker.register('/sw.js?v=' + Date.now())
            .then(reg => {
                console.log('SW registered v2');
                // Check for updates on page load
                reg.update();
            })
            .catch(() => console.log('SW registration failed'));
    }
});

/* ----- Scroll to Top Button ----- */
(function() {
    const btn = document.createElement('button');
    btn.id = 'scrollTop';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Scroll to top');
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '1px solid rgba(212,168,67,0.3)',
        background: 'rgba(12,15,20,0.9)',
        color: '#d4a843',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(8px)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center'
    });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.style.display = 'flex';
            requestAnimationFrame(() => { btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; });
        } else {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            setTimeout(() => { if (window.scrollY <= 400) btn.style.display = 'none'; }, 300);
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
