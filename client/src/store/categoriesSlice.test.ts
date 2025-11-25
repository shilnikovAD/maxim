import { describe, it, expect } from 'vitest';
import categoriesReducer, { fetchCategories } from './categoriesSlice';
import { Category } from '../types';

const mockCategories: Category[] = [
  { id: 1, name: 'Завтраки', slug: 'breakfast' },
  { id: 2, name: 'Обеды', slug: 'lunch' },
  { id: 3, name: 'Ужины', slug: 'dinner' },
];

describe('categoriesSlice', () => {
  const initialState = {
    items: [],
    status: 'idle' as const,
    error: null,
  };

  describe('fetchCategories async thunk', () => {
    it('should set status to loading when pending', () => {
      const result = categoriesReducer(initialState, fetchCategories.pending('requestId'));
      expect(result.status).toBe('loading');
      expect(result.error).toBeNull();
    });

    it('should update items when fulfilled', () => {
      const result = categoriesReducer(
        { ...initialState, status: 'loading' },
        fetchCategories.fulfilled(mockCategories, 'requestId')
      );
      expect(result.status).toBe('succeeded');
      expect(result.items).toEqual(mockCategories);
    });

    it('should set error when rejected', () => {
      const error = new Error('Network error');
      const result = categoriesReducer(
        { ...initialState, status: 'loading' },
        fetchCategories.rejected(error, 'requestId')
      );
      expect(result.status).toBe('failed');
      expect(result.error).toBe('Network error');
    });
  });
});
