import { test, expect } from '@playwright/test';

test.describe('Recipe Book - User Flows', () => {
  test('should display home page with categories and recipes', async ({ page }) => {
    await page.goto('/');
    
    // Check header is visible
    await expect(page.getByRole('link', { name: /Книга рецептов/i })).toBeVisible();
    
    // Check navigation links
    await expect(page.getByRole('link', { name: 'Главная' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Категории' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Избранное/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'О проекте' })).toBeVisible();
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Книга рецептов/i })).toBeVisible();
    
    // Check search form is present
    await expect(page.getByPlaceholder(/Название блюда/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Ингредиенты/i)).toBeVisible();
  });

  test('should navigate to categories page', async ({ page }) => {
    await page.goto('/');
    
    // Click categories link
    await page.getByRole('link', { name: 'Категории' }).click();
    
    // Should be on categories page
    await expect(page).toHaveURL('/categories');
    await expect(page.getByRole('heading', { name: 'Категории рецептов' })).toBeVisible();
  });

  test('should navigate to favorites page', async ({ page }) => {
    await page.goto('/');
    
    // Click favorites link
    await page.getByRole('link', { name: /Избранное/i }).click();
    
    // Should be on favorites page
    await expect(page).toHaveURL('/favorites');
    await expect(page.getByRole('heading', { name: /Избранные рецепты/i })).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    // Click about link
    await page.getByRole('link', { name: 'О проекте' }).click();
    
    // Should be on about page
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'О проекте' })).toBeVisible();
  });
});
