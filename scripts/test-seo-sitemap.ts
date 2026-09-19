import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Starting Senior Technical SEO Validation ---');

const SITEMAP_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');
const ROBOTS_PATH = path.resolve(process.cwd(), 'public/robots.txt');

// 1. Check sitemap.xml exists
assert.ok(fs.existsSync(SITEMAP_PATH), 'public/sitemap.xml must exist');
const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8').trim();
assert.ok(sitemapContent.length > 0, 'public/sitemap.xml must not be empty');

// 2. XML Declaration & Namespace check
assert.ok(sitemapContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Must include standard XML declaration');
assert.ok(sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'Must have sitemaps.org 0.9 schema namespace');

// 3. Extract and check all URLs
const locRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
const urls: string[] = [];
let match;
while ((match = locRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs in sitemap:`, urls);

const EXPECTED_ROUTES = [
  'https://qrhere.online/',
  'https://qrhere.online/qr-code-generator',
  'https://qrhere.online/blog',
  'https://qrhere.online/blog/static-vs-dynamic-qr-code',
  'https://qrhere.online/blog/how-to-create-vcard-qr-code',
  'https://qrhere.online/faq',
  'https://qrhere.online/about',
  'https://qrhere.online/contact',
  'https://qrhere.online/privacy',
  'https://qrhere.online/terms',
];

assert.strictEqual(urls.length, EXPECTED_ROUTES.length, `Expected exactly ${EXPECTED_ROUTES.length} indexable URLs`);
for (const expected of EXPECTED_ROUTES) {
  assert.ok(urls.includes(expected), `Sitemap must include ${expected}`);
}
assert.ok(!urls.includes('https://qrhere.online/scan'), 'Sitemap must not include /scan');
assert.ok(!urls.includes('https://qrhere.online/create'), 'Sitemap must not include /create');

// 4. Verify no illegal or unwanted URLs
for (const url of urls) {
  assert.ok(url.startsWith('https://qrhere.online'), `URL ${url} must use production domain https://qrhere.online`);
  assert.ok(!url.includes('localhost'), `URL ${url} must not contain localhost`);
  assert.ok(!url.includes('127.0.0.1'), `URL ${url} must not contain 127.0.0.1`);
  assert.ok(!url.includes('404'), `URL ${url} must not be a 404 page`);
  assert.ok(!url.includes('?'), `URL ${url} must not contain query parameters`);
  assert.ok(!url.includes('qr-now'), `URL ${url} must not reference old domains`);
}

// 5. Verify no duplicate URLs
const uniqueUrls = new Set(urls);
assert.strictEqual(uniqueUrls.size, urls.length, 'Sitemap must contain zero duplicate URLs');

// 6. Verify unnecessary metadata is absent
assert.ok(!sitemapContent.includes('<changefreq>'), 'Sitemap should not contain deprecated/ignored <changefreq> metadata');
assert.ok(!sitemapContent.includes('<priority>'), 'Sitemap should not contain deprecated/ignored <priority> metadata');

// 7. Check robots.txt
assert.ok(fs.existsSync(ROBOTS_PATH), 'public/robots.txt must exist');
const robotsContent = fs.readFileSync(ROBOTS_PATH, 'utf-8');
assert.ok(robotsContent.includes('User-agent: *'), 'robots.txt must specify User-agent: *');
assert.ok(robotsContent.includes('Allow: /'), 'robots.txt must allow root crawling');
assert.ok(!robotsContent.includes('Disallow: /'), 'robots.txt must not disallow all crawlers');
assert.ok(robotsContent.includes('Sitemap: https://qrhere.online/sitemap.xml'), 'robots.txt must specify Sitemap: https://qrhere.online/sitemap.xml');

console.log('✓ All SEO Sitemap and Robots checks passed successfully!');
