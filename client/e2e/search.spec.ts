import { test, expect } from '@playwright/test';

test.describe('Recipe Book - Search Flow', () => {
  test('should search for recipes by name', async ({ page }) => {
    await page.goto('/');
    
    // Enter search query
    const searchInput = page.getByPlaceholder(/Название блюда/i);
    await searchInput.fill('Омлет');
    
    // Click search button
    await page.getByRole('button', { name: /Найти/i }).click();
    
    // Wait for results section to update
    await expect(page.getByRole('heading', { name: 'Результаты поиска' })).toBeVisible();
  });

  test('should search for recipes by ingredients', async ({ page }) => {
    await page.goto('/');
    
    // Enter ingredients
    const ingredientsInput = page.getByPlaceholder(/Ингредиенты/i);
    await ingredientsInput.fill('курица, сыр');
    
    // Click search button
    await page.getByRole('button', { name: /Найти/i }).click();
    
    // Wait for results section to update
    await expect(page.getByRole('heading', { name: 'Результаты поиска' })).toBeVisible();
  });
});
