import { test, expect } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
});

test('scene remains intact without canvas support', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext; });
  await page.goto('/');
  await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  await expect(page.locator('.step-stage').getByRole('button', { name: /Accept/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('missing optional IntersectionObserver does not blank the landing', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => { Object.defineProperty(window, 'IntersectionObserver', { value: undefined }); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  expect(errors).toEqual([]);
});

test('background and reload recover the selected scene without uncaught errors', async ({ page, context }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
  const background = await context.newPage();
  await background.goto('about:blank');
  await background.bringToFront();
  await background.waitForTimeout(400);
  await page.bringToFront();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  await page.reload();
  await page.getByRole('tab', { name: /Refine/ }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  expect(errors).toEqual([]);
});

test('failed installation screenshots preserve usable instructions', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'platform', { value: 'MacIntel' });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0 });
    Object.defineProperty(navigator, 'userAgentData', { value: undefined });
    Object.defineProperty(navigator, 'userAgent', { value: 'Macintosh' });
  });
  await page.route('**/assets/*.webp', route => route.abort());
  await page.goto('/');
  await page.locator('.hero-download').getByRole('button', { name: 'Installation help' }).click();
  await expect(page.getByRole('dialog').getByText(/Find.*Rasc-0.1.1-unsigned.dmg/)).toBeVisible();
  await expect(page.getByRole('dialog').getByText('Image unavailable. Follow the instructions above.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close installation guide' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('older browsers without Intl.Segmenter still render and refine', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: undefined }); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
});
