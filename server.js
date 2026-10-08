// Minimal zero-dependency static file server for Railway (listens on $PORT).
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const PUBLIC = ['index.html', 'css', 'js', 'assets', 'robots.txt', 'sitemap.xml'];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.normalize(path.join(ROOT, urlPath));
  const top = path.relative(ROOT, filePath).split(path.sep)[0];
  if (!filePath.startsWith(ROOT + path.sep) || !PUBLIC.includes(top)) {
    return sendIndex(res, 404);
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) return sendIndex(res, 404);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=604800',
      'X-Content-Type-Options': 'nosniff'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(PORT, () => console.log(`Vikcom site running on port ${PORT}`));

function sendIndex(res, status) {
  res.writeHead(status, { 'Content-Type': TYPES['.html'] });
  fs.createReadStream(path.join(ROOT, 'index.html')).pipe(res);
}
