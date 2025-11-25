import { Router } from 'express';
import * as recipeController from '../controllers/recipeController';

const router = Router();

// Recipes routes
router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/search', recipeController.searchRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);

// Categories routes
router.get('/categories', recipeController.getCategories);

// Favorites routes
router.get('/favorites', recipeController.getFavorites);
router.post('/favorites', recipeController.addFavorite);
router.delete('/favorites/:id', recipeController.removeFavorite);
router.delete('/favorites/recipe/:recipeId', recipeController.removeFavoriteByRecipeId);

export default router;
