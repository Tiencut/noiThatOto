import { test, expect } from '@playwright/test';

test('search → open product → affiliate links contain UTM', async ({ page, baseURL }) => {
  await page.goto('/products');

  // ensure products list loaded
  await expect(page.locator('text=Danh sách sản phẩm')).toBeVisible();

  // perform a search for 'Thảm' which exists in generated data
  await page.fill('input[placeholder="Tìm tên sản phẩm"]', 'Thảm');
  await page.click('button:has-text("Tìm")');

  // wait for product cards and click the first
  const first = page.locator('a').filter({ has: page.locator('img') }).first();
  await expect(first).toBeVisible();
  await first.click();

  // on product page, check affiliate buttons include utm_source
  const shopee = page.locator('a:has-text("Mua trên Shopee")');
  await expect(shopee).toHaveCount(1);
  const href = await shopee.getAttribute('href');
  expect(href).toBeTruthy();
  expect(href!.includes('utm_source=cardecor')).toBe(true);

  // clicking buy should trigger track POST
  const [resp] = await Promise.all([
    page.waitForResponse((r) => r.url().endsWith('/api/track') && r.request().method() === 'POST'),
    shopee.click()
  ]);
  expect(resp.ok()).toBe(true);
  const body = await resp.json();
  expect(body.ok).toBe(true);
});