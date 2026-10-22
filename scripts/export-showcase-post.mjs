/**
 * Renders the DEV showcase post at native 2× and writes lossless PNG masters.
 * Usage: node scripts/export-showcase-post.mjs [--pose=m3|m1] [--out=basename]
 */
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pose = process.argv.find((a) => a.startsWith('--pose='))?.split('=')[1] ?? 'm3';
const outBase =
  process.argv.find((a) => a.startsWith('--out='))?.split('=')[1] ??
  (pose === 'm3' ? 'rasc-post-companion-m3' : pose === 'm1' ? 'rasc-post-companion' : 'rasc-post');

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Dev server did not start at ${url}`);
}

async function main() {
  const port = 5173;
  const baseUrl = `http://127.0.0.1:${port}`;
  const query = pose ? `?showcase=post&pose=${pose}` : '?showcase=post';
  const url = `${baseUrl}/${query}`;

  const vite = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, BROWSER: 'none' },
  });

  try {
    await waitForServer(baseUrl);
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1200, height: 1080 },
      deviceScaleFactor: 2,
    });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('.showcase-post');
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.showcase-post img')];
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve, reject) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', reject, { once: true });
              }),
        ),
      );
      if (document.fonts?.ready) await document.fonts.ready;
    });

    const post = page.locator('.showcase-post');
    const out2x = path.join(root, 'docs/showcase', `${outBase}@2x.png`);
    await post.screenshot({ path: out2x, type: 'png', animations: 'disabled' });

    const out1x = path.join(root, 'docs/showcase', `${outBase}.png`);
    await sharp(out2x)
      .resize(1200, 1080, { kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(out1x);

    await browser.close();
    console.log('Wrote', out2x);
    console.log('Wrote', out1x);
  } finally {
    vite.kill('SIGTERM');
    await once(vite, 'exit').catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
