import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';
import categoriesReducer from './categoriesSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    categories: categoriesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
