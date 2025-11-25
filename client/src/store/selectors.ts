import { RootState } from './index';

// Recipes selectors
export const selectAllRecipes = (state: RootState) => state.recipes.items;
export const selectSelectedRecipe = (state: RootState) => state.recipes.selected;
export const selectSearchResults = (state: RootState) => state.recipes.searchResults;
export const selectRecipesStatus = (state: RootState) => state.recipes.status;
export const selectSearchStatus = (state: RootState) => state.recipes.searchStatus;
export const selectRecipesError = (state: RootState) => state.recipes.error;

// Categories selectors
export const selectAllCategories = (state: RootState) => state.categories.items;
export const selectCategoriesStatus = (state: RootState) => state.categories.status;
export const selectCategoriesError = (state: RootState) => state.categories.error;

// Favorites selectors
export const selectAllFavorites = (state: RootState) => state.favorites.items;
export const selectFavoritesStatus = (state: RootState) => state.favorites.status;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
export const selectIsFavorite = (recipeId: number) => (state: RootState) =>
  state.favorites.items.some(f => f.recipeId === recipeId);
