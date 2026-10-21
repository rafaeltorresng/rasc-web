import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

async function macIdentity(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'platform', { value: 'MacIntel' });
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/26.0 Safari/605.1.15' });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0 });
    Object.defineProperty(navigator, 'userAgentData', { value: undefined });
  });
}

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
});

test('responsive landing: required widths and intermediate short viewports', async ({ page }, testInfo) => {
  await page.goto('/');
  const results = [];
  for (const width of [320, 375, 390, 430, 600, 767, 768, 820, 821, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 700 : 900 });
    await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();
    const result = await page.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth - innerWidth, clipped: [...document.querySelectorAll('.step-tab, .interaction-next, .header-download')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).map(el => el.textContent) }));
    results.push(result);
    expect(result.overflow, `width ${width}`).toBeLessThanOrEqual(1);
    expect(result.clipped, `width ${width}`).toEqual([]);
  }
  for (const size of [{ width: 844, height: 390 }, { width: 640, height: 360 }]) {
    await page.setViewportSize(size);
    await page.getByRole('tab', { name: /Refine/ }).click();
    await page.locator('.step-stage').scrollIntoViewIfNeeded();
    await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
    await page.locator('.step-stage').getByRole('button', { name: /Accept/ }).scrollIntoViewIfNeeded();
    await expect(page.locator('.step-stage').getByRole('button', { name: /Accept/ })).toBeInViewport();
  }
  await testInfo.attach('responsive-matrix', { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
});

test('installation overview: all steps, keyboard, Escape and focus restoration', async ({ page }, testInfo) => {
  await macIdentity(page); await page.goto('/');
  const opener = page.locator('.hero-download').getByRole('link', { name: 'Installation help' });
  await opener.click();
  const dialog = page.getByRole('dialog'); const close = dialog.getByRole('button', { name: 'Close installation guide' });
  await expect(close).toBeFocused();
  await expect(dialog.getByRole('heading', { level: 3 })).toHaveCount(4);
  await expect(dialog.getByRole('button', { name: 'Next', exact: true })).toHaveCount(0);
  await close.press('Shift+Tab'); await expect(dialog.getByRole('link', { name: 'Download again' })).toBeFocused();
  await page.keyboard.press('Tab'); await expect(close).toBeFocused();
  await dialog.getByRole('link', { name: /Blocked by macOS/ }).click();
  await expect(dialog.getByRole('heading', { name: 'If macOS blocks it.' })).toBeFocused();
  await testInfo.attach('guide-overview', { body: await page.screenshot(), contentType: 'image/png' });
  await page.keyboard.press('Escape'); await expect(dialog).toHaveCount(0); await expect(opener).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  for(let i=0;i<3;i++) { await opener.click(); await expect(page.getByRole('heading', { name:'Open the .dmg',exact:true })).toBeVisible(); await page.getByRole('button', { name:'Close installation guide' }).click(); await expect(page.getByRole('dialog')).toHaveCount(0); }
});

test('guide remains usable in short displays and 200% equivalent reflow', async ({ page }) => {
  await macIdentity(page); await page.goto('/');
  for(const size of [{width:320,height:568},{width:600,height:900},{width:768,height:360},{width:640,height:360}]) {
    await page.setViewportSize(size); await page.locator('.hero-download').getByRole('link', {name:'Installation help'}).click();
    const dialog=page.getByRole('dialog'); const close=dialog.getByRole('button',{name:'Close installation guide'});
    await expect(close).toBeInViewport(); await expect(dialog.getByRole('link',{name:'Open full guide'})).toBeInViewport();
    expect(await dialog.evaluate(el=>el.scrollWidth-el.clientWidth)).toBeLessThanOrEqual(1);
    await dialog.getByRole('link',{name:/Blocked by macOS/}).click();
    await expect(dialog.getByRole('heading',{name:'If macOS blocks it.'})).toBeInViewport();
    await close.click(); await expect(dialog).toHaveCount(0);
  }
});

test('Home and Search tolerate pause, manual selection and replay', async ({ page }) => {
  await page.goto('/');
  const root = page.locator('.home-search-scene');
  await root.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(root.locator('.search-window')).toBeVisible();
  await expect(root.locator('.search-result.is-selected')).toContainText('Follow-up thought');
  for (let i = 0; i < 5; i++) {
    await root.getByRole('button', { name: 'Home', exact: true }).click();
    await expect(root).toHaveAttribute('data-search-phase', 'home');
    await root.getByRole('button', { name: 'Search', exact: true }).click();
    await expect(root).toHaveAttribute('data-search-phase', 'result');
  }
  await root.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(root.getByRole('button', { name: 'Resume', exact: true })).toBeVisible();
  await root.getByRole('button', { name: 'Resume', exact: true }).click();
  await root.getByRole('button', { name: 'Replay the Home and Search example' }).click();
  await expect(root).toHaveAttribute('data-search-phase', 'result');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await root.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(root).toHaveAttribute('data-search-phase', 'result');
});

test('WCAG AA automated checks on landing, Refine and modal', async ({ page }, testInfo) => {
  await macIdentity(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const state of ['landing', 'refine', 'dialog']) {
    if (state === 'refine') await page.getByRole('tab', { name: /Refine/ }).click();
    if (state === 'dialog') await page.locator('.hero-download').getByRole('link', { name: 'Installation help' }).click();
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    await testInfo.attach(`axe-${state}`, { body: JSON.stringify(scan.violations, null, 2), contentType: 'application/json' });
    expect.soft(scan.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })), state).toEqual([]);
  }
});


test('hero motion continues beyond five seconds and resumes after suspension', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const hero = page.locator('.product-tableau');
  await hero.scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-motion', 'running');
  await expect(hero.locator('button')).toHaveCount(0);
  // Exercise the former four-second stop using the real animation clock.
  await page.waitForTimeout(5500);
  await expect(hero).toHaveAttribute('data-motion', 'running');
  const canvas = hero.locator('canvas').first();
  const movingPixels = await canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL());
  await expect.poll(() => canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL())).not.toBe(movingPixels);
  expect(await hero.locator('.product-tableau__caret').evaluate(el => getComputedStyle(el).animationName)).toBe('tableau-caret-blink');
  await page.getByRole('heading', { name: 'Your thoughts stay on your Mac.', exact: true }).scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-motion', 'paused');
  const pausedPixels = await canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(150);
  expect(await canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL())).toBe(pausedPixels);
  await hero.scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-motion', 'running');
  const returnedPixels = await canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL());
  await expect.poll(() => canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL())).not.toBe(returnedPixels);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(hero).toHaveAttribute('data-motion', 'paused');
  await expect(hero.locator('canvas, .product-tableau__caret')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(hero).toHaveAttribute('data-motion', 'running');
});
