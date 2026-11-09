import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';

const config = JSON.parse(await readFile(new URL('./config.json', import.meta.url), 'utf8'));
let destination;
try {
  destination = new URL(config.url);
  if (destination.protocol !== 'https:' || destination.username || destination.password || /[\u0000-\u001f\u007f]/.test(config.url)) throw Error();
} catch { throw Error('Edite config.json e informe uma URL HTTPS válida no campo "url".'); }
const matches = (...domains) => domains.some(domain => destination.hostname === domain || destination.hostname.endsWith('.' + domain));
const platform = matches('meli.la', 'mercadolivre.com.br', 'mercadolibre.com', 'mercadolibre.com.br')
  ? { name: 'Mercado Livre', background: '#ffe600', logo: true }
  : matches('shopee.com.br', 'shope.ee')
  ? { name: 'Shopee', background: '#ee4d2d' }
  : matches('amazon.com.br', 'amazon.com', 'amzn.to')
  ? { name: 'Amazon', background: '#ffb84d' }
  : matches('magalu.com', 'magazineluiza.com.br', 'magalu.onelink.me')
  ? { name: 'Magalu', background: '#0086ff' }
  : { name: 'loja parceira', background: '#e9edf5' };
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const template = await readFile(new URL('./index.template.html', import.meta.url), 'utf8');
const brand = platform.logo
  ? '<img class="brand-logo" src="/assets/mercado-livre.webp" width="268" height="68" alt="Mercado Livre" fetchpriority="high" decoding="async">'
  : `<div class="brand-name">${escape(platform.name)}</div>`;
const html = template.replaceAll('{{STORE}}', escape(platform.name)).replaceAll('{{PREPOSITION}}', platform.name === 'Mercado Livre' || platform.name === 'Magalu' ? 'no' : 'na').replaceAll('{{URL}}', escape(config.url)).replaceAll('{{BACKGROUND}}', platform.background).replace('{{BRAND}}', brand);
const output = new URL('./dist/', import.meta.url);
await mkdir(output, { recursive: true });
await cp(new URL('./assets/', import.meta.url), new URL('./dist/assets/', import.meta.url), { recursive: true });
await writeFile(new URL('./dist/index.html', import.meta.url), html);
console.log(`Página pronta para ${platform.name}. O link foi preservado sem parâmetros adicionais.`);
