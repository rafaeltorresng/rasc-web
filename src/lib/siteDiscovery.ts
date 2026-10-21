/** Crawl hints for the landing and the permanent installation guide. */
export function siteDiscoveryFiles(canonicalHref: string): { robotsTxt: string; sitemapXml: string } {
  const canonical = new URL(canonicalHref);
  const sitemapUrl = new URL('sitemap.xml', canonical).href;
  return {
    robotsTxt: `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`,
    sitemapXml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeXml(canonical.href)}</loc>\n  </url>\n  <url>\n    <loc>${escapeXml(new URL('install/', canonical).href)}</loc>\n  </url>\n</urlset>\n`,
  };
}

function escapeXml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    switch (character) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return '&apos;';
    }
  });
}
