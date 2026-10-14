import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set the real published address at build time. Local previews need no canonical.
const siteUrl = process.env.VITE_SITE_URL;
const canonical = siteUrl ? new URL(siteUrl) : undefined;
if (canonical && (!['https:', 'http:'].includes(canonical.protocol)
  || canonical.username || canonical.password || canonical.search || canonical.hash
  || !canonical.pathname.endsWith('/'))) {
  throw new Error('VITE_SITE_URL must be an http(s) site URL ending in /, without credentials, query or fragment.');
}

// GitHub Pages project site: https://rafaeltorres.dev/rasc-web/
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), {
    name: 'public-site-metadata',
    transformIndexHtml(html) {
      if (!canonical) return html;
      const imageUrl = new URL('og-image.png', canonical).href;
      return {
        html: html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+("\s*\/>)/g, `$1${imageUrl}$2`),
        tags: [
          { tag: 'link', attrs: { rel: 'canonical', href: canonical.href }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: canonical.href }, injectTo: 'head' },
        ],
      };
    },
  }],
});
