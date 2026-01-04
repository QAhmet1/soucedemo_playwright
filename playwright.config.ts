import { defineConfig, devices } from '@playwright/test';
import { Config } from './src/config/config';

/**
 * Playwright configuration file.
 * This is where we define browsers, timeouts, and global settings.
 */
export default defineConfig({
  testDir: './tests',
  forbidOnly:!!process.env.CI,
  retries:process.env.CI? 2:1,
  workers:process.env.CI? 4:undefined,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  /* Shared settings for all the projects below. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    baseURL: Config.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video:'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [

    { 
      name: 'setup', 
      testMatch: /auth\.setup\.ts/ 
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
       },
       dependencies: ['setup'],
    }
  ],
});