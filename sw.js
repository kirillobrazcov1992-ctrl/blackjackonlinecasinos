const CACHE = 'bj-cache-v1';
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
  'assets/css/style.css',
  'assets/js/main.js',
  'assets/js/i18n.js',
  'assets/js/blackjack-game.js',
  'assets/js/card-counting-trainer.js',
  'assets/js/strategy-trainer.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(URLS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
