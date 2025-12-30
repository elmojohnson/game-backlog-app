import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.TEST_BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "Desktop",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: !!process.env.CI
    ? {
        command: "npm run preview",
        port: 4173,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
      }
    : undefined,
});
