import { test, expect } from './fixtures';

const errors = new WeakMap<object, string[]>();
test.beforeEach(async ({ page }) => {
  const failures: string[] = [];
  errors.set(page, failures);
  page.on('pageerror', error => failures.push(error.stack ?? error.message));
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
  await page.goto('/');
});
test.afterEach(async ({ page }, testInfo) => {
  const failures = errors.get(page) ?? [];
  await testInfo.attach('runtime-errors', { body: JSON.stringify(failures), contentType: 'application/json' });
  expect(failures, 'No uncaught runtime exception').toEqual([]);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('advance through Refine, accept, Keep, restart and cancel', async ({ page }) => {
  const scene = page.locator('.step-stage');
  await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
  await expect(page.getByRole('tab', { name: /Refine/ })).toHaveAttribute('aria-selected', 'true');
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute('data-phase', 'preview');
  await expect(scene.locator('.scratchpad-text')).toContainText('Before sending');
  await scene.getByRole('button', { name: /Accept/ }).click();
  await expect(page.getByRole('button', { name: /Keep the thought/ })).toBeFocused();
  await page.getByRole('button', { name: /Keep the thought/ }).click();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute('data-phase', 'return');
  await page.getByRole('button', { name: /Start another thought/ }).click();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute('data-phase', 'idle');
  await scene.getByRole('button', { name: /Refine/ }).click();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute('data-phase', 'preview');
  await scene.getByRole('button', { name: /Cancel/ }).click();
  await expect(scene).toHaveAttribute('data-product-state', 'capture');
});

test('rapid repeated and interrupted chapter selection never blanks the page', async ({ page }) => {
  const scene = page.locator('.step-stage');
  const sequence = ['Refine', 'Capture', 'Keep', 'Keep', 'Capture', 'Refine', 'Refine'];
  for (let run = 0; run < 8; run++) {
    for (const name of sequence) {
      await page.getByRole('tab', { name: new RegExp(name) }).click();
      await expect(page.locator('#interaction-panel h3')).not.toBeEmpty();
      await expect(scene.locator('.mac-work')).toBeVisible();
      await expect(page.locator('#root')).not.toBeEmpty();
    }
  }
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute('data-phase', 'preview');
  await expect(scene.locator('.step-scratch-layer')).toHaveCSS('opacity', '1');
  await expect(scene.getByRole('button', { name: /Accept/ })).toBeVisible();
});

test('keyboard tabs, viewport interruption and reduced-motion changes', async ({ page }) => {
  const capture = page.getByRole('tab', { name: /Capture/ });
  await capture.focus();
  await capture.press('ArrowRight');
  await expect(page.getByRole('tab', { name: /Refine/ })).toBeFocused();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  await page.getByRole('tab', { name: /Refine/ }).press('End');
  await expect(page.getByRole('tab', { name: /Keep/ })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: /Keep/ }).press('Home');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('tab', { name: /Refine/ }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  await page.getByRole('tab', { name: /Keep/ }).click();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'return');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('tab', { name: /Capture/ }).click();
  await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();
  const paused = await page.locator('.step-stage').getAttribute('data-phase');
  await page.waitForTimeout(500);
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', paused!);
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'idle');
});

test('Try Refine works during early, middle and completed Capture', async ({ page }) => {
  test.setTimeout(60_000);
  for (const delay of [200, 2400, 6100]) {
    await page.getByRole('tab', { name: /Capture/ }).click();
    await page.locator('.step-stage').scrollIntoViewIfNeeded();
    await page.waitForTimeout(delay);
    await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
    await page.locator('.step-stage').scrollIntoViewIfNeeded();
    await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
    await expect(page.locator('.step-stage .scratchpad-text')).toContainText('Before sending');
  }
});

test('simulated visibility suspension preserves pending Refine and resumes cleanly', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'shaping');
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(2700);
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'shaping');
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  await testInfo.attach('visibility-test-scope', { body: 'Visibility property/event emulation; not a physical device or OS-window background test.', contentType: 'text/plain' });
});

test('automatic Capture can be paused without losing the unfinished thought', async ({ page }) => {
  await page.getByRole('tab', { name: /Capture/ }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  const pause = page.getByRole('button', { name: 'Pause capture animation', exact: true });
  await pause.click();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-paused', 'true');
  const before = await page.locator('.step-stage .scratchpad-copy').textContent();
  await page.waitForTimeout(500);
  expect(await page.locator('.step-stage .scratchpad-copy').textContent()).toBe(before);
  await page.getByRole('button', { name: 'Resume capture animation', exact: true }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'idle');
  await expect(page.locator('.step-stage .scratchpad-copy')).toContainText('before sending');
});
