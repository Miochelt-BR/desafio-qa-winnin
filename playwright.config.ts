import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  
  expect: {
    timeout: 10000,
  },

  fullyParallel: true,
  /* Forçamos valores fixos para evitar erros de compilação com process.env */
  forbidOnly: false,
  retries: 0,
  workers: undefined,
  reporter: [['html'], ['list']],
  
  use: {
    headless: false, 
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'test-results/',
});