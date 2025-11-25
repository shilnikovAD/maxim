import { describe, it, expect } from 'vitest';
import recipesReducer, {
  clearSelected,
  clearSearchResults,
  fetchRecipes,
  fetchRecipeById,
  searchRecipes,
} from './recipesSlice';
import { Recipe } from '../types';

const mockRecipe: Recipe = {
  id: 1,
  title: 'Тестовый рецепт',
  description: 'Описание тестового рецепта',
  image: 'https://example.com/image.jpg',
  category: 'Завтраки',
  time: 30,
  ingredients: ['ингредиент 1', 'ингредиент 2'],
  steps: ['шаг 1', 'шаг 2'],
};

const mockRecipes: Recipe[] = [
  mockRecipe,
  {
    id: 2,
    title: 'Второй рецепт',
    description: 'Описание второго рецепта',
    image: 'https://example.com/image2.jpg',
    category: 'Обеды',
    time: 45,
    ingredients: ['ингредиент 3'],
    steps: ['шаг 3'],
  },
];

describe('recipesSlice', () => {
  const initialState = {
    items: [],
    selected: null,
    searchResults: [],
    status: 'idle' as const,
    searchStatus: 'idle' as const,
    error: null,
  };

  describe('reducers', () => {
    it('should return initial state', () => {
      expect(recipesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle clearSelected', () => {
      const stateWithSelected = {
        ...initialState,
        selected: mockRecipe,
      };
      const result = recipesReducer(stateWithSelected, clearSelected());
      expect(result.selected).toBeNull();
    });

    it('should handle clearSearchResults', () => {
      const stateWithSearch = {
        ...initialState,
        searchResults: mockRecipes,
        searchStatus: 'succeeded' as const,
      };
      const result = recipesReducer(stateWithSearch, clearSearchResults());
      expect(result.searchResults).toEqual([]);
      expect(result.searchStatus).toBe('idle');
    });
  });

  describe('fetchRecipes async thunk', () => {
    it('should set status to loading when pending', () => {
      const result = recipesReducer(initialState, fetchRecipes.pending('requestId', undefined));
      expect(result.status).toBe('loading');
      expect(result.error).toBeNull();
    });

    it('should update items when fulfilled', () => {
      const result = recipesReducer(
        { ...initialState, status: 'loading' },
        fetchRecipes.fulfilled(mockRecipes, 'requestId', undefined)
      );
      expect(result.status).toBe('succeeded');
      expect(result.items).toEqual(mockRecipes);
    });

    it('should set error when rejected', () => {
      const error = new Error('Network error');
      const result = recipesReducer(
        { ...initialState, status: 'loading' },
        fetchRecipes.rejected(error, 'requestId', undefined)
      );
      expect(result.status).toBe('failed');
      expect(result.error).toBe('Network error');
    });
  });

  describe('fetchRecipeById async thunk', () => {
    it('should set status to loading when pending', () => {
      const result = recipesReducer(initialState, fetchRecipeById.pending('requestId', 1));
      expect(result.status).toBe('loading');
    });

    it('should update selected when fulfilled', () => {
      const result = recipesReducer(
        { ...initialState, status: 'loading' },
        fetchRecipeById.fulfilled(mockRecipe, 'requestId', 1)
      );
      expect(result.status).toBe('succeeded');
      expect(result.selected).toEqual(mockRecipe);
    });
  });

  describe('searchRecipes async thunk', () => {
    it('should set searchStatus to loading when pending', () => {
      const result = recipesReducer(
        initialState,
        searchRecipes.pending('requestId', { query: 'тест' })
      );
      expect(result.searchStatus).toBe('loading');
    });

    it('should update searchResults when fulfilled', () => {
      const result = recipesReducer(
        { ...initialState, searchStatus: 'loading' },
        searchRecipes.fulfilled(mockRecipes, 'requestId', { query: 'тест' })
      );
      expect(result.searchStatus).toBe('succeeded');
      expect(result.searchResults).toEqual(mockRecipes);
    });
  });
});
