import { devices } from '@playwright/test';
import { test, expect } from './fixtures';
import { createHash } from 'node:crypto';

const installer = 'https://github.com/rafaeltorresng/rasc/releases/download/v0.1.3/Rasc-0.1.3-unsigned.dmg';
const sha256 = 'a3ee1b99cfd8839238a589aee2a8d68768bb2c021e8a7efbe2557b22df969ee1';

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
});

test('Mac download starts without losing the guide, modified clicks stay native', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'platform', { value: 'MacIntel' });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0 });
    Object.defineProperty(navigator, 'userAgentData', { value: undefined });
    Object.defineProperty(navigator, 'userAgent', { value: 'Macintosh' });
  });
  await page.goto('/');
  const link = page.locator('.hero-download').getByRole('link', { name: 'Download for Mac', exact: true });
  await expect(link).toHaveAttribute('href', installer);
  // Full public download on one desktop project; equivalent link behavior on all others.
  if (testInfo.project.name !== 'chrome-mac' && !testInfo.project.name.includes('webkit')) await page.route(installer, route => route.fulfill({ status: 200, headers: { 'content-type': 'application/x-apple-diskimage', 'content-disposition': 'attachment; filename="Rasc-0.1.3-unsigned.dmg"' }, body: Buffer.from('fixture-dmg') }));
  const download = page.waitForEvent('download');
  await link.click();
  const downloaded = await download;
  expect(downloaded.suggestedFilename()).toBe('Rasc-0.1.3-unsigned.dmg');
  if (testInfo.project.name === 'chrome-mac') {
    const hash = createHash('sha256');
    for await (const chunk of (await downloaded.createReadStream())!) hash.update(chunk);
    expect(hash.digest('hex')).toBe(sha256);
  }
  // Touch/short Mac contexts deliberately use manual help instead.
  const automatic = await page.evaluate(() => matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches);
  await expect(page.getByRole('dialog')).toHaveCount(automatic ? 1 : 0);
  if (automatic) await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  // Dispatch a modified activation without following a new browsing context.
  await link.dispatchEvent('click', { button: 0, ctrlKey: true });
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('Windows, Linux, iPad desktop, Android and unknown identities use the intended CTA', async ({ browser }, testInfo) => {
  const scenarios = [
    { name: 'Windows', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', platform: 'Win32', touch: 10, primary: false },
    { name: 'Linux', ua: 'Mozilla/5.0 (X11; Linux x86_64)', platform: 'Linux x86_64', touch: 0, primary: false },
    { name: 'iPad desktop', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', platform: 'MacIntel', touch: 5, primary: false },
    { name: 'Android', ua: devices['Pixel 7'].userAgent, platform: 'Linux armv8l', touch: 5, primary: false },
    { name: 'unknown', ua: 'PrivateBrowser', platform: '', touch: 0, primary: true },
  ];
  for (const item of scenarios) {
    const page = await browser.newPage();
    await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
    await page.addInitScript(item => {
      Object.defineProperty(navigator, 'userAgent', { value: item.ua });
      Object.defineProperty(navigator, 'platform', { value: item.platform });
      Object.defineProperty(navigator, 'maxTouchPoints', { value: item.touch });
      Object.defineProperty(navigator, 'userAgentData', { value: undefined });
    }, item);
    await page.goto('http://127.0.0.1:5190/');
    await expect(page.getByRole('link', { name: 'Download for Mac', exact: true }), item.name).toHaveCount(item.primary ? 3 : 0);
    if (!item.primary) {
      await expect(page.getByRole('link', { name: 'Download Mac installer', exact: true })).toHaveCount(2);
      await expect(page.getByRole('button', { name: 'Installation help' })).toHaveCount(0);
      expect(await page.evaluate(() => performance.getEntriesByType('resource').filter(e => /download-|dmg-|blocked-|privacy-/.test(e.name)).map(e => e.name))).toEqual([]);
      await page.route(installer, route => route.abort());
      const download = page.waitForRequest(installer);
      await page.locator('.hero-download').getByRole('link', { name: 'Download Mac installer', exact: true }).click();
      await download;
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
    await testInfo.attach(`platform-${item.name}`, { body: await page.screenshot(), contentType: 'image/png' });
    await page.close();
  }
});

test('metadata, anchors, assets and production query routes remain intact', async ({ page, request }) => {
  const failures: string[] = [];
  page.on('response', response => { if (response.url().startsWith('http://127.0.0.1:5190/') && response.status() >= 400) failures.push(response.url()); });
  for (const query of ['', '?showcase=post', '?showcase=studies', '?companion=1']) {
    await page.goto('/'+query);
    await expect(page.getByRole('heading', { name: 'A scratchpad for unfinished thoughts.', exact: true })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://rasc.app/');
    const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute('href')!).filter(href => href.length > 1 && !document.getElementById(href.slice(1))));
    expect(invalidAnchors).toEqual([]);
  }
  for (const section of ['.owned-moment', '.home-search-scene', '.closing-section']) await page.locator(section).scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('img').evaluateAll(images => images.map(img => img as HTMLImageElement).filter(img => img.complete && img.naturalWidth === 0).map(img => img.src))).toEqual([]);
  for (const path of ['/robots.txt','/sitemap.xml','/favicon-32.png','/apple-touch-icon.png','/og-image.png']) expect((await request.get(path)).status(), path).toBe(200);
  expect(failures).toEqual([]);
});
