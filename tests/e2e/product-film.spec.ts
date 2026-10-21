import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
});

test('inline film is contextual, demand-loaded, playable, pausable and replayable', async ({ page }, testInfo) => {
  const mp4: string[] = [];
  page.on('request', request => { if (/\/media\/.*\.mp4/.test(request.url())) mp4.push(request.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator('#product-film');
  const video = section.locator('video');
  await expect(page.locator('.product-hero').getByRole('button')).toHaveCount(0);
  expect(await page.locator('main > section').evaluateAll(sections => sections.map(node => node.id || node.className))).toEqual(expect.arrayContaining(['product-film', 'how-it-works']));
  expect(await section.evaluate(el => el.previousElementSibling?.classList.contains('owned-moment') && el.nextElementSibling?.id === 'how-it-works')).toBe(true);
  await section.scrollIntoViewIfNeeded();
  expect(mp4).toEqual([]);
  await expect(video).not.toHaveAttribute('src');
  expect(await video.evaluate(v => (v as HTMLVideoElement).paused && (v as HTMLVideoElement).preload === 'none')).toBe(true);
  await expect(section.getByText('Illustrative demo · Refine results may vary.', { exact: true })).toBeVisible();
  await section.getByRole('button', { name: 'Play product film' }).focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.5);
  expect(mp4.length).toBeGreaterThan(0);
  expect(await video.evaluate(v => (v as HTMLVideoElement).controls)).toBe(true);
  await expect(video).toHaveAttribute('playsinline', '');
  await expect(section.locator('.film-poster')).toBeHidden();
  // Browser-level media controls, without replacing them with fake controls.
  await video.evaluate(v => (v as HTMLVideoElement).pause());
  expect(await video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  await video.evaluate(v => { const media = v as HTMLVideoElement; media.volume = .4; media.muted = true; return media.play(); });
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
  await video.evaluate(v => { const media = v as HTMLVideoElement; media.currentTime = media.duration - .3; });
  await expect(section.getByRole('button', { name: 'Replay product film' })).toBeVisible();
  await expect(video).toHaveAttribute('poster', /rasc-product-film-poster\.webp$/);
  expect(await video.evaluate(v => (v as HTMLVideoElement).controls)).toBe(true);
  await testInfo.attach('film-ended', { body: await section.screenshot(), contentType: 'image/png' });
  await section.getByRole('button', { name: 'Replay product film' }).click();
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeLessThan(3);
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
  await video.evaluate(v => (v as HTMLVideoElement).pause());
  const scan = await new AxeBuilder({ page }).include('#product-film').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(scan.violations).toEqual([]);
});

test('responsive film and section rhythm remain intact', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator('#product-film');
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    await section.scrollIntoViewIfNeeded();
    await expect.poll(() => section.locator('img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const rect = await section.locator('.film-frame').boundingBox();
    expect(Math.abs(rect!.width / rect!.height - 16 / 9)).toBeLessThan(.02);
    const play = section.getByRole('button', { name: 'Play product film' });
    expect((await play.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await testInfo.attach(`film-section-${width}`, { body: await section.screenshot(), contentType: 'image/png' });
    if (width === 390 || width === 1440) {
      await testInfo.attach(`landing-${width}`, { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
      await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();
      await testInfo.attach(`hero-${width}`, { body: await page.screenshot(), contentType: 'image/png' });
    }
  }
  await section.locator('summary').click();
  await expect(section.getByText(/The interface is native/)).toBeVisible();
});

test('unavailable video preserves poster, written guidance and other landing interactions', async ({ page }) => {
  await page.route('**/media/rasc-product-film.mp4', route => route.fulfill({ status: 503, body: 'Unavailable' }));
  await page.goto('/');
  const section = page.locator('#product-film');
  await section.getByRole('button', { name: 'Play product film' }).click();
  await expect(section.getByRole('status')).toContainText('Video unavailable.');
  await expect(section.getByRole('link', { name: 'Open the MP4' })).toHaveAttribute('href', /\/media\/rasc-product-film.mp4$/);
  await expect(section.locator('img')).toBeVisible();
  await section.locator('summary').click();
  await expect(section.getByText(/The interface is native/)).toBeVisible();
  await page.getByRole('tab', { name: /Refine/ }).click();
  await expect(page.locator('#interaction-panel')).toHaveAttribute('data-step', 'refine');
});

test('missing poster keeps a usable play control', async ({ page }) => {
  await page.route('**/media/rasc-product-film-in-use.webp', route => route.fulfill({ status: 404, body: 'Unavailable' }));
  await page.goto('/');
  const section = page.locator('#product-film');
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator('.film-poster-fallback')).toBeVisible();
  await section.getByRole('button', { name: 'Play product film' }).click();
  await expect.poll(() => section.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.3);
});

test('a slow media response keeps the poster and reserved geometry until playback', async ({ page }) => {
  let release!: () => void;
  const held = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/media/rasc-product-film.mp4', async route => { await held; await route.continue(); });
  await page.goto('/');
  const section = page.locator('#product-film');
  const frame = section.locator('.film-frame');
  await section.scrollIntoViewIfNeeded();
  const initial = await frame.boundingBox();
  try {
    await section.getByRole('button', { name: 'Play product film' }).click();
    await expect(section.getByRole('button', { name: 'Play product film' })).toContainText('Loading film…');
    await expect(section.getByRole('button', { name: 'Play product film' })).toBeDisabled();
    await expect(section.locator('.film-poster')).toBeVisible();
    await expect(frame).toHaveAttribute('data-revealed', 'false');
    expect(await frame.boundingBox()).toEqual(initial);
  } finally { release(); }
  await expect.poll(() => section.locator('video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.3);
  expect(await frame.boundingBox()).toEqual(initial);
});
