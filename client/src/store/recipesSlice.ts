import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, ApiState } from '../types';
import { recipesApi } from '../api';

interface RecipesState extends ApiState {
  items: Recipe[];
  selected: Recipe | null;
  searchResults: Recipe[];
  searchStatus: ApiState['status'];
}

const initialState: RecipesState = {
  items: [],
  selected: null,
  searchResults: [],
  status: 'idle',
  searchStatus: 'idle',
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchAll',
  async (category?: string) => {
    return await recipesApi.getAll(category);
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchById',
  async (id: number) => {
    return await recipesApi.getById(id);
  }
);

export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async ({ query, ingredients }: { query?: string; ingredients?: string }) => {
    return await recipesApi.search(query, ingredients);
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      // Fetch recipe by ID
      .addCase(fetchRecipeById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action: PayloadAction<Recipe>) => {
        state.status = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recipe';
      })
      // Search recipes
      .addCase(searchRecipes.pending, (state) => {
        state.searchStatus = 'loading';
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { clearSelected, clearSearchResults } = recipesSlice.actions;
export default recipesSlice.reducer;
