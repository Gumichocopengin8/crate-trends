import { test, expect } from '@playwright/test';

test.describe('Root Page', () => {
  test.describe('Navigation', () => {
    test('Internal Navigation', async ({ page }) => {
      await page.goto('http://localhost:3000/');
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

      await page.getByRole('link', { name: 'crates.io' }).click();
      await expect(page).toHaveURL('https://crates.io');
      await page.goBack();

      await page.getByRole('link', { name: 'GitHub' }).click();
      await expect(page).toHaveURL('https://github.com/Gumichocopengin8/crate-trends');
      await page.goBack();

      await page.getByRole('link', { name: 'Keita Nonaka' }).click();
      await expect(page).toHaveURL('https://github.com/Gumichocopengin8');
      await page.goBack();
    });
  });
});
