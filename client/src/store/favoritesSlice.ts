import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Favorite, ApiState } from '../types';
import { favoritesApi } from '../api';

interface FavoritesState extends ApiState {
  items: Favorite[];
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async () => {
    return await favoritesApi.getAll();
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (recipeId: number) => {
    return await favoritesApi.add(recipeId);
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (recipeId: number) => {
    await favoritesApi.removeByRecipeId(recipeId);
    return recipeId;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Favorite[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      // Add favorite
      .addCase(addFavorite.fulfilled, (state, action: PayloadAction<Favorite>) => {
        state.items.push(action.payload);
      })
      // Remove favorite
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(f => f.recipeId !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
