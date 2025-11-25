import { Request, Response } from 'express';
import * as recipeService from '../services/recipeService';

export const getRecipes = (req: Request, res: Response): void => {
  const { category } = req.query;
  const recipes = recipeService.getAllRecipes(category as string | undefined);
  res.json(recipes);
};

export const getRecipeById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const recipe = recipeService.getRecipeById(id);
  
  if (!recipe) {
    res.status(404).json({ error: 'Recipe not found' });
    return;
  }
  
  res.json(recipe);
};

export const searchRecipes = (req: Request, res: Response): void => {
  const { query, ingredients } = req.query;
  const recipes = recipeService.searchRecipes(
    query as string | undefined,
    ingredients as string | undefined
  );
  res.json(recipes);
};

export const getCategories = (_req: Request, res: Response): void => {
  const categories = recipeService.getAllCategories();
  res.json(categories);
};

export const getFavorites = (_req: Request, res: Response): void => {
  const favorites = recipeService.getAllFavorites();
  res.json(favorites);
};

export const addFavorite = (req: Request, res: Response): void => {
  const { recipeId } = req.body;
  
  if (!recipeId) {
    res.status(400).json({ error: 'recipeId is required' });
    return;
  }

  const recipe = recipeService.getRecipeById(recipeId);
  if (!recipe) {
    res.status(404).json({ error: 'Recipe not found' });
    return;
  }

  const favorite = recipeService.addFavorite(recipeId);
  res.status(201).json(favorite);
};

export const removeFavorite = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const removed = recipeService.removeFavorite(id);
  
  if (!removed) {
    res.status(404).json({ error: 'Favorite not found' });
    return;
  }
  
  res.status(204).send();
};

export const removeFavoriteByRecipeId = (req: Request, res: Response): void => {
  const recipeId = parseInt(req.params.recipeId, 10);
  const removed = recipeService.removeFavoriteByRecipeId(recipeId);
  
  if (!removed) {
    res.status(404).json({ error: 'Favorite not found' });
    return;
  }
  
  res.status(204).send();
};
