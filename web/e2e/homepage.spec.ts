import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.describe('Navigation', () => {
    test('Internal Navigation', async ({ page, browserName }) => {
      await page.goto('http://localhost:3000/');
      await test.step('Screenshot home page', async () => {
        test.skip(browserName !== 'webkit', 'Only mac has compatibility with GitHub Action Mac');
        await expect(page).toHaveScreenshot('homepage.png', { maxDiffPixels: 50 });
      });
      await test.step('Click the button to navigate crate page', async () => {
        await page.getByRole('button', { name: 'futures vs tokio vs async-std' }).click();
        await expect(page).toHaveURL(/.*\/futures\+tokio\+async-std$/);
      });
      await test.step('Click Emoji button to navigate home page', async () => {
        await page.getByRole('link', { name: '🦀 Crate Trends' }).click();
        await expect(page).toHaveURL(/.*\/$/);
      });
    });

    test('External Navigation', async ({ page }) => {
      await page.goto('http://localhost:3000/');

      await test.step('Click the button to navigate crates.io', async () => {
        await page.getByRole('link', { name: 'crates.io' }).click();
        await expect(page).toHaveURL('https://crates.io');
        await page.goBack();
      });

      await test.step('Click the button to navigate the GitHub repo', async () => {
        await page.getByRole('link', { name: 'GitHub' }).click();
        await expect(page).toHaveURL('https://github.com/Gumichocopengin8/crate-trends');
        await page.goBack();
      });

      await test.step('Click the button to navigate GitHub profile', async () => {
        await page.getByRole('link', { name: 'Keita Nonaka' }).click();
        await expect(page).toHaveURL('https://github.com/Gumichocopengin8');
        await page.goBack();
      });
    });
  });
});
