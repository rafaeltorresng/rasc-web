/** Root-relative URL for files in `public/`, respecting Vite `base` (e.g. GitHub Pages `/rasc-web/`). */
export function publicUrl(path: string): string {
  const normalized = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
}
