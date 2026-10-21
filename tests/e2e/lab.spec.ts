import { test, expect } from './fixtures';
import { devices } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const evidenceRoot = process.env.RASC_QA_OUTPUT ?? 'test-results/lab';
const evidence = `${evidenceRoot}/evidence`;

test('lab measurements and final visual evidence', async ({ browser, browserName }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'One repeatable Chromium lab, not field metrics');
  test.setTimeout(60_000);
  const samples = [];
  await mkdir(evidence, { recursive: true });
  for (let run = 0; run < 3; run++) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 400_000, uploadThroughput: 100_000 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
    await page.addInitScript(() => {
      const lab = { lcp: 0, cls: 0, longTasks: [] as number[], interactions: [] as number[] };
      Object.assign(window, { auditLab: lab });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) lab.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) { const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }; if (!shift.hadRecentInput) lab.cls += shift.value; } }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) lab.longTasks.push(entry.duration); }).observe({ type: 'longtask', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries()) lab.interactions.push(entry.duration); }).observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
    });
    await page.goto('http://127.0.0.1:5190/');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Try Refine', exact: true }).click();
    await page.locator('.step-stage').scrollIntoViewIfNeeded();
    await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
    const result = await page.evaluate(() => ({
      ...(window as typeof window & { auditLab: object }).auditLab,
      paints: performance.getEntriesByType('paint').map(e => ({ name: e.name, ms: e.startTime })),
      resources: (performance.getEntriesByType('resource') as PerformanceResourceTiming[]).map(e => ({ path: new URL(e.name).pathname, transferBytes: e.transferSize, decodedBytes: e.decodedBodySize, ms: e.duration })),
    }));
    samples.push(result);
    await context.close();
  }
  await writeFile(`${evidenceRoot}/lab.json`, JSON.stringify({ engine: browserName, conditions: 'macOS Chromium; 390×844 CSS px; cold cache; 150ms RTT, 400000 B/s down, 100000 B/s up, CPU 4×; local uncompressed preview; analytics blocked; 3 independent contexts; Event Timing samples are interaction latency proxies, not field INP; CLS sum over observed session, not CrUX session-window aggregation', samples }, null, 2));

  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort());
  await page.goto('http://127.0.0.1:5190/');
  await page.screenshot({ path: `${evidence}/after-desktop.png` });
  await expect(page.locator('.product-tableau button')).toHaveCount(0);
  await expect(page.locator('.product-tableau')).toHaveAttribute('data-motion', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.product-tableau')).toHaveAttribute('data-motion', 'paused');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.product-tableau')).toHaveAttribute('data-motion', 'running');
  await page.getByRole('tab', { name: /Refine/ }).click();
  await page.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  await page.screenshot({ path: `${evidence}/after-refine-desktop.png` });
  await page.close();
  const mobile = await browser.newPage({ ...devices['Pixel 7'], viewport: { width: 390, height: 844 } });
  await mobile.route('https://static.cloudflareinsights.com/**', route => route.abort());
  await mobile.goto('http://127.0.0.1:5190/');
  await mobile.screenshot({ path: `${evidence}/after-mobile.png` });
  await mobile.getByRole('tab', { name: /Refine/ }).click();
  await mobile.locator('.step-stage').scrollIntoViewIfNeeded();
  await expect(mobile.locator('.step-stage')).toHaveAttribute('data-phase', 'preview');
  await mobile.screenshot({ path: `${evidence}/after-refine-mobile.png` });
  await mobile.close();
});
