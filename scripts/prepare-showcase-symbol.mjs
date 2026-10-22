/** Lossless Lanczos exports for the publication wordmark (not the in-app capture). */
import sharp from 'sharp';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'public/rasc-symbol-current.png');
const outDir = path.join(root, 'public/showcase');

await mkdir(outDir, { recursive: true });

const png = { compressionLevel: 9, adaptiveFiltering: true };

for (const size of [512, 1024]) {
  const out = path.join(outDir, `rasc-symbol-wordmark-${size}.png`);
  await sharp(src)
    .resize(size, size, { fit: 'contain', kernel: sharp.kernel.lanczos3, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png(png)
    .toFile(out);
  console.log('Wrote', out);
}
