/** Crawl hints for the one published landing URL. No extra pages are advertised. */
export function siteDiscoveryFiles(canonicalHref: string): { robotsTxt: string; sitemapXml: string } {
  const canonical = new URL(canonicalHref);
  const sitemapUrl = new URL('sitemap.xml', canonical).href;
  return {
    robotsTxt: `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`,
    sitemapXml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeXml(canonical.href)}</loc>\n  </url>\n</urlset>\n`,
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
