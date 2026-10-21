import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ diagnostics: void }>({
  diagnostics: [async ({ page }, use, testInfo) => {
    const runtime: string[] = [];
    const consoleErrors: string[] = [];
    const failedRequests: { url: string; error?: string }[] = [];
    page.on('pageerror', error => runtime.push(error.stack || `${error.name}: ${error.message}`));
    page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
    await use();
    await testInfo.attach('browser-diagnostics', { body: JSON.stringify({ runtime, consoleErrors, failedRequests }, null, 2), contentType: 'application/json' });
    expect(runtime, 'Uncaught runtime errors / unhandled rejections').toEqual([]);
  }, { auto: true }],
});
export { expect };
