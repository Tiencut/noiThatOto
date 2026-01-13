import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5000 },
  use: {
    baseURL: process.env.PW_BASE_URL || 'http://localhost:3000',
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});