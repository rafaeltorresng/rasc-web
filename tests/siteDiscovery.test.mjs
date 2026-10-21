import assert from 'node:assert/strict';
import { test } from 'node:test';
import { siteDiscoveryFiles } from '../src/lib/siteDiscovery.ts';

test('discovery files advertise the canonical landing and permanent installation guide', () => {
  const { robotsTxt, sitemapXml } = siteDiscoveryFiles('https://rasc.app/');

  assert.equal(robotsTxt, 'User-agent: *\nAllow: /\n\nSitemap: https://rasc.app/sitemap.xml\n');
  assert.equal(sitemapXml, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rasc.app/</loc>
  </url>
  <url>
    <loc>https://rasc.app/install/</loc>
  </url>
</urlset>
`);
  assert.equal(sitemapXml.includes('/rasc-web/'), false);
});

test('sitemap escapes reserved characters in the canonical URL', () => {
  const { sitemapXml, robotsTxt } = siteDiscoveryFiles('https://rasc.app/a&b/');
  assert.match(sitemapXml, /<loc>https:\/\/rasc\.app\/a&amp;b\/<\/loc>/);
  assert.match(robotsTxt, /^Sitemap: https:\/\/rasc\.app\/a&b\/sitemap\.xml$/m);
});
