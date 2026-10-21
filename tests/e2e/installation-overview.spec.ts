import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', (route) => route.abort());
});
test('permanent installation guide supports direct load, refresh and all platforms', async ({ page }, testInfo) => {
  await page.goto('/install/');
  await expect(page).toHaveTitle('Install Rasc — First launch guide');
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(4);
  await expect(page.getByRole('link', { name: /Download (for Mac|Mac installer)/ })).toHaveAttribute(
    'href',
    /releases\/download\/v0.1.1/,
  );
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Install Rasc.', exact: true })).toBeVisible();
  await page.goto('/install/index.html');
  await expect(page.getByRole('heading', { name: 'Install Rasc.', exact: true })).toBeVisible();
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(
      1,
    );
    if (width === 390 || width === 1440) await testInfo.attach(`install-page-${width}`, { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  }
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});
test('installation help remains discoverable on mobile and images open at original resolution', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.hero-download .installation-help').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: /Blocked by macOS/ }).click();
  await expect(dialog.getByRole('heading', { name: 'If macOS blocks it.' })).toBeInViewport();
  const image = dialog.getByRole('link', { name: /Enlarge image: Security section/ });
  const [popup] = await Promise.all([page.waitForEvent('popup'), image.click()]);
  await popup.waitForLoadState();
  expect(popup.url()).toMatch(/privacy-security.*webp/);
  await popup.close();
  await page.keyboard.press('Escape');
  await page.locator('.site-footer').getByRole('link', { name: 'Installation help' }).click();
  await expect(page).toHaveURL(/\/install\/$/);
});

test('first-launch security instructions are visible before expanding supporting screenshots', async ({ page }, testInfo) => {
  await page.goto('/');
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.locator('.hero-download .installation-help').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'If macOS blocks it.' })).toBeInViewport();
    await expect(dialog.locator('.installation-security-copy > ol > li').last()).toBeInViewport();
    await expect(dialog.getByRole('heading', { name: 'Open the .dmg', exact: true })).toBeInViewport();
    await expect(dialog.locator('.installation-screenshots')).not.toHaveAttribute('open', '');
    await testInfo.attach(`installation-priority-${viewport.width}`, { body: await page.screenshot(), contentType: 'image/png' });
    await page.keyboard.press('Escape');
  }
});
