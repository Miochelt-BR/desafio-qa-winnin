import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Tempo total máximo que cada teste pode levar (60 segundos) */
  timeout: 60000, 
  
  expect: {
    /* Tempo máximo para cada 'expect' (validação) passar */
    timeout: 10000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    /* Abre o navegador por padrão para você ver o teste rodando */
    headless: false, 
    trace: 'on-first-retry',
    /* Tira prints automaticamente se o teste falhar */
    screenshot: 'only-on-failure', 
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Comentei os outros para seu teste rodar mais rápido e não pesar o PC */
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});