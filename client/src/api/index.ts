import { apiClient } from './apiClient';
import { Recipe, Category, Favorite } from '../types';

export const recipesApi = {
  getAll: (category?: string): Promise<Recipe[]> => {
    const query = category ? `?category=${category}` : '';
    return apiClient.get<Recipe[]>(`/recipes${query}`);
  },

  getById: (id: number): Promise<Recipe> => {
    return apiClient.get<Recipe>(`/recipes/${id}`);
  },

  search: (query?: string, ingredients?: string): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (ingredients) params.append('ingredients', ingredients);
    return apiClient.get<Recipe[]>(`/recipes/search?${params.toString()}`);
  },
};

export const categoriesApi = {
  getAll: (): Promise<Category[]> => {
    return apiClient.get<Category[]>('/categories');
  },
};

export const favoritesApi = {
  getAll: (): Promise<Favorite[]> => {
    return apiClient.get<Favorite[]>('/favorites');
  },

  add: (recipeId: number): Promise<Favorite> => {
    return apiClient.post<Favorite>('/favorites', { recipeId });
  },

  remove: (id: number): Promise<void> => {
    return apiClient.delete(`/favorites/${id}`);
  },

  removeByRecipeId: (recipeId: number): Promise<void> => {
    return apiClient.delete(`/favorites/recipe/${recipeId}`);
  },
};
