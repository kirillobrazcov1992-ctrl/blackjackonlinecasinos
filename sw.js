const CACHE = 'bj-cache-v3';
const URLS = [
  '/',
  '/index.html',
  '/rules.html',
  '/basic-strategy.html',
  '/blackjack-odds.html',
  '/variations.html',
  '/history.html',
  '/glossary.html',
  '/strategy.html',
  '/advanced-strategy.html',
  '/card-counting.html',
  '/shuffle-tracking.html',
  '/side-bets.html',
  '/tournament-blackjack.html',
  '/online-blackjack.html',
  '/bankroll-management.html',
  '/blackjack-myths.html',
  '/blackjack-etiquette.html',
  '/blackjack-faq.html',
  '/books.html',
  '/reviews.html',
  '/demo-casino.html',
  '/blackjack-game.html',
  '/card-counting-trainer.html',
  '/strategy-trainer.html',
  '/video-poker.html',
  '/roulette.html',
  '/contact.html',
  '/privacy.html',
  '/terms.html',
  '/responsible-gaming.html',
  'assets/css/style.css?v=2',
  'assets/js/main.js?v=2',
  'assets/js/i18n.js?v=2',
  'assets/js/blackjack-game.js?v=2',
  'assets/js/card-counting-trainer.js?v=2',
  'assets/js/strategy-trainer.js?v=2',
  'assets/js/strategy-calculator.js?v=2',
  'assets/js/player-profile.js?v=2',
  'assets/js/ai-coach.js?v=2',
  'assets/js/mastery-dashboard.js?v=2',
];

self.addEventListener('install', e => {
  // Force new service worker to activate immediately
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(URLS))
  );
});

self.addEventListener('activate', e => {
  // Clean up old caches
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  // Take control of all pages immediately
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for HTML pages, cache-first for assets
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
