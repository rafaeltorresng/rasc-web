import { test, expect } from './fixtures';

// Keep recording overhead and competing audio out of the decoding measurement.
test.use({ video: 'off', trace: 'off' });

test('full Complete playback records decoding diagnostics without claiming native Safari', async ({ page }, testInfo) => {
  test.setTimeout(55_000);
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
  await page.goto('/');
  await page.bringToFront();
  const section = page.locator('#product-film');
  const video = section.locator('video');
  // Silent benchmark prevents competing test contexts from taking audio focus.
  await video.evaluate((v, muted) => { (v as HTMLVideoElement).muted = muted; }, testInfo.project.name !== 'chrome-mac');
  await section.getByRole('button', { name: 'Play product film' }).click();
  let completed = false;
  try { await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).ended), { timeout: 42_000 }).toBe(true); completed = true; }
  finally {
    const result = await video.evaluate(v => {
      const media = v as HTMLVideoElement;
      const quality = media.getVideoPlaybackQuality();
      return { duration: media.duration, currentTime: media.currentTime, width: media.videoWidth, height: media.videoHeight,
        error: media.error?.message ?? null, frames: quality.totalVideoFrames, dropped: quality.droppedVideoFrames,
        paused: media.paused, ended: media.ended, muted: media.muted, visibility: document.visibilityState, userAgent: navigator.userAgent };
    });
    await testInfo.attach('complete-playback', { body: JSON.stringify(result, null, 2), contentType: 'application/json' });
    expect(result.duration).toBeCloseTo(27.9, 1);
    expect(result.error).toBeNull();
    expect([result.width, result.height]).toEqual([1920, 1080]);
  }
  expect(completed).toBe(true);
});
