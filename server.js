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
      'X-Frame-Options': 'DENY',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'max-age=86400',
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`🎴 BlackjackOnlineCasinos running on port ${PORT}`);
});
