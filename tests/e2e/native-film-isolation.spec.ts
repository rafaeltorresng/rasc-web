import { expect, test } from '@playwright/test';

test('production uses the final public film without loading capture studies', async ({ page }) => {
  const captureRequests: string[] = [];
  page.on('request', request => { if (request.url().includes('/film/')) captureRequests.push(request.url()); });
  await page.goto('/?film=native-demo');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('unfinished thoughts');
  await expect(page.locator('#product-film')).toHaveCount(1);
  await expect(page.locator('.product-hero').getByRole('button', { name: /Watch|Play/ })).toHaveCount(0);
  await expect(page.locator('video')).not.toHaveAttribute('src');
  expect(captureRequests).toEqual([]);
});

test('production retains approved hero and excludes comparison controls', async ({ page }) => {
  const studyRequests: string[] = [];
  page.on('request', request => { if (/HeroStudy|FilmStudy/.test(request.url())) studyRequests.push(request.url()); });
  await page.goto('/?hero=centered&atmosphere=clean&film=editorial');
  await expect(page.locator('.product-hero')).toHaveAttribute('data-layout', 'editorial');
  await expect(page.locator('.product-hero')).toHaveAttribute('data-atmosphere', 'ambient');
  await expect(page.locator('#product-film')).toHaveAttribute('data-variant', 'minimal');
  await expect(page.locator('.hero-review-controls, .film-study-controls')).toHaveCount(0);
  expect(studyRequests).toEqual([]);
});
