import { describe, it, expect } from 'vitest';
import favoritesReducer, {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from './favoritesSlice';
import { Favorite } from '../types';

const mockFavorite: Favorite = {
  id: 1,
  recipeId: 5,
  addedAt: '2024-01-15T10:00:00Z',
};

const mockFavorites: Favorite[] = [
  mockFavorite,
  {
    id: 2,
    recipeId: 10,
    addedAt: '2024-01-16T12:00:00Z',
  },
];

describe('favoritesSlice', () => {
  const initialState = {
    items: [],
    status: 'idle' as const,
    error: null,
  };

  describe('fetchFavorites async thunk', () => {
    it('should set status to loading when pending', () => {
      const result = favoritesReducer(initialState, fetchFavorites.pending('requestId'));
      expect(result.status).toBe('loading');
      expect(result.error).toBeNull();
    });

    it('should update items when fulfilled', () => {
      const result = favoritesReducer(
        { ...initialState, status: 'loading' },
        fetchFavorites.fulfilled(mockFavorites, 'requestId')
      );
      expect(result.status).toBe('succeeded');
      expect(result.items).toEqual(mockFavorites);
    });

    it('should set error when rejected', () => {
      const error = new Error('Failed to fetch');
      const result = favoritesReducer(
        { ...initialState, status: 'loading' },
        fetchFavorites.rejected(error, 'requestId')
      );
      expect(result.status).toBe('failed');
      expect(result.error).toBe('Failed to fetch');
    });
  });

  describe('addFavorite async thunk', () => {
    it('should add new favorite to items when fulfilled', () => {
      const stateWithFavorites = {
        ...initialState,
        items: [mockFavorites[1]],
      };
      const result = favoritesReducer(
        stateWithFavorites,
        addFavorite.fulfilled(mockFavorite, 'requestId', 5)
      );
      expect(result.items).toHaveLength(2);
      expect(result.items).toContainEqual(mockFavorite);
    });
  });

  describe('removeFavorite async thunk', () => {
    it('should remove favorite from items when fulfilled', () => {
      const stateWithFavorites = {
        ...initialState,
        items: mockFavorites,
      };
      const result = favoritesReducer(
        stateWithFavorites,
        removeFavorite.fulfilled(5, 'requestId', 5)
      );
      expect(result.items).toHaveLength(1);
      expect(result.items.find(f => f.recipeId === 5)).toBeUndefined();
    });

    it('should keep other favorites when removing one', () => {
      const stateWithFavorites = {
        ...initialState,
        items: mockFavorites,
      };
      const result = favoritesReducer(
        stateWithFavorites,
        removeFavorite.fulfilled(5, 'requestId', 5)
      );
      expect(result.items.find(f => f.recipeId === 10)).toBeDefined();
    });
  });
});
