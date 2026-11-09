import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
const root = resolve('dist');
const types = { '.html':'text/html; charset=utf-8', '.webp':'image/webp', '.svg':'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const file = resolve(root, '.' + (url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname)));
    if (!file.startsWith(root + sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    const content = await readFile(file);
    res.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream' });
    res.end(content);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(Number(process.env.PORT || 5204), '127.0.0.1', () => console.log('Prévia: http://127.0.0.1:' + (process.env.PORT || 5204)));
