/** Root-relative URL for files in `public/`, respecting Vite `base` (production `/` on rasc.app). */
export function publicUrl(path: string): string {
  const normalized = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
}
