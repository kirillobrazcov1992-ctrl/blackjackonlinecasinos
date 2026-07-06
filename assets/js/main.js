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

    /* ----- Header shrink on scroll ----- */
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            header.style.height = '60px';
        } else {
            header.style.height = 'var(--header-h)';
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
