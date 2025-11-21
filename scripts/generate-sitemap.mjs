import fs from 'fs';
import path from 'path';
import process from 'process';

const SITE_URL = process.env.SITE_URL;
if (!SITE_URL) {
  console.error('SITE_URL is required');
  process.exit(1);
}

function readJsonSafe(p) {
  try {
    if (p && fs.existsSync(p)) {
      const s = fs.readFileSync(p, 'utf-8');
      return JSON.parse(s);
    }
  } catch {}
  return {};
}

const cfgPath = process.env.CONFIG_PATH || path.resolve(process.cwd(), 'remote-config.json');
let config = readJsonSafe(cfgPath);
if (!config.basic) config = readJsonSafe(path.resolve(process.cwd(), 'config.json'));
if (!config.basic) config = readJsonSafe(path.resolve(process.cwd(), 'public/config.json'));

let strapiUrl = process.env.strapi_url || (config.basic && config.basic.strapi_url) || '';
let siteSlug = process.env.strapi_site_slug || (config.basic && config.basic.strapi_site_slug) || '';
const token = process.env.STRAPI_API_TOKEN || '';

async function fetchAllPosts() {
  if (!strapiUrl || !siteSlug) return [];
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const pageSize = 100;
  let page = 1;
  const out = [];
  while (true) {
    const url = `${strapiUrl}/api/blog-posts?fields[0]=slug&fields[1]=createdAt&fields[2]=publishedAt&filters[site][slug][$eq]=${encodeURIComponent(siteSlug)}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`;
    const res = await fetch(url, { headers });
    if (!res.ok) break;
    const json = await res.json();
    const data = json && json.data ? json.data : [];
    out.push(...data);
    const meta = json && json.meta && json.meta.pagination ? json.meta.pagination : null;
    if (!meta || page >= meta.pageCount) break;
    page += 1;
  }
  return out.map((item) => {
    const slug = item && (item.slug ?? (item.attributes && item.attributes.slug)) || null;
    const published = item && (item.publishedAt ?? item.createdAt ?? (item.attributes && (item.attributes.publishedAt ?? item.attributes.createdAt))) || null;
    return slug ? { slug, lastmod: published ? String(published).split('T')[0] : null } : null;
  }).filter(Boolean);
}

function joinUrl(base, p) {
  const b = base.endsWith('/') ? base : base + '/';
  try {
    return new URL(p.replace(/^\//, ''), b).href;
  } catch {
    return b.replace(/\/$/, '') + p;
  }
}

function buildSitemapXml(items) {
  const urls = items.map((it) => {
    const last = it.lastmod ? `<lastmod>${it.lastmod}</lastmod>` : '';
    const change = `<changefreq>daily</changefreq>`;
    const pr = `<priority>${it.priority ?? '0.7'}</priority>`;
    return `<url><loc>${it.loc}</loc>${last}${change}${pr}</url>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

const distDir = path.resolve(process.cwd(), 'dist');
fs.mkdirSync(distDir, { recursive: true });

(async () => {
  const staticPaths = ['/', '/blog'];
  const staticItems = staticPaths.map((p) => ({ loc: joinUrl(SITE_URL, p), priority: '0.8' }));
  const posts = await fetchAllPosts();
  const postItems = posts.map((p) => ({ loc: joinUrl(SITE_URL, `/blog/${p.slug}`), lastmod: p.lastmod, priority: '0.6' }));
  const xml = buildSitemapXml([...staticItems, ...postItems]);
  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL.replace(/\/$/, '')}/sitemap.xml\n`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf-8');
})();