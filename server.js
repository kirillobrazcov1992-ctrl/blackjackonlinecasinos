const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

http.createServer((req, res) => {
  const query = req.url.includes('?') ? req.url.split('?')[1]||'' : '';
  const params = new URLSearchParams(query);

  // FORCE UPDATE: bypass stale service worker cache
  if (params.has('force_update') || params.has('nuclear')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Force Update</title></head><body style="background:#0c0f14;color:#d4a843;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;"><div style="text-align:center;"><h1>&spades; Force Update</h1><p style="color:#8a8f96;">Clearing caches and refreshing...</p><script>(async function(){if("caches" in window){var k=await caches.keys();await Promise.all(k.map(function(x){return caches.delete(x);}));}if("serviceWorker" in navigator){var r=await navigator.serviceWorker.getRegistrations();await Promise.all(r.map(function(x){return x.unregister();}));}window.location.replace("/");})();<\/script></div></body></html>');
    return;
  }

  let url = req.url.split('?')[0];
  if (url === '/' || !path.extname(url)) url = '/index.html';
  
  const filePath = path.join(__dirname, url);
  const ext = path.extname(filePath);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback / 404
      fs.readFile(path.join(__dirname, '404.html'), (e2, d2) => {
        res.writeHead(e2 ? 404 : 404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(e2 ? '404 Not Found' : d2);
      });
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Cache-Control': (ext === '.html' || ext === '.js' || ext === '.css') ? 'no-cache, no-store, must-revalidate' : 'max-age=86400',
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`🎴 BlackjackOnlineCasinos running on port ${PORT}`);
});
