/** Diagnostic only: distinguish a host media pipeline from the React player.
 * This records observations; it deliberately makes no compatibility/pass claim.
 */
import { webkit } from '@playwright/test';
import { preview } from 'vite';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const server = await preview({ preview: { host: '127.0.0.1', port: 5193, strictPort: true } });
const browser = await webkit.launch();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('http://127.0.0.1:5193/__media_probe__', route => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><html lang="en"><title>Native media control probe</title><button>Play</button><video controls muted playsinline preload="none" width="960" height="540" src="/media/rasc-product-film.mp4"></video><script>document.querySelector("button").onclick=()=>document.querySelector("video").play().catch(e=>window.playFailure=String(e))</script></html>',
  }));
  await page.goto('http://127.0.0.1:5193/__media_probe__');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  // Deliberate fixed observation interval, not a test timeout or asserted latency.
  await page.waitForTimeout(5000);
  const observation = await page.locator('video').evaluate(video => {
    const quality = video.getVideoPlaybackQuality();
    return { currentTime: video.currentTime, duration: video.duration, paused: video.paused,
      readyState: video.readyState, networkState: video.networkState, error: video.error?.message ?? null,
      frames: quality.totalVideoFrames, dropped: quality.droppedVideoFrames,
      buffered: Array.from({ length: video.buffered.length }, (_, i) => [video.buffered.start(i), video.buffered.end(i)]),
      visibility: document.visibilityState, userAgent: navigator.userAgent };
  });
  const bytes = await readFile('public/media/rasc-product-film.mp4');
  const report = { purpose: 'Observation only; not a playback success assertion', platform: process.platform,
    setup: 'Plain native video, muted, user-clicked, no React, no player CSS', observationSeconds: 5,
    mediaSha256: createHash('sha256').update(bytes).digest('hex'), observation, pageErrors: errors,
    playFailure: await page.evaluate(() => window.playFailure ?? null) };
  await mkdir('test-results', { recursive: true });
  await writeFile('test-results/native-media-probe.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
}
