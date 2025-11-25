import db from '../db/database';
import { Recipe, Category, Favorite } from '../models/types';

export const getAllRecipes = (category?: string): Recipe[] => {
  let query = `
    SELECT r.id, r.title, r.description, r.image, c.name as category, r.time, r.ingredients, r.steps
    FROM recipes r
    LEFT JOIN categories c ON r.category_id = c.id
  `;
  
  const params: string[] = [];
  if (category) {
    query += ' WHERE c.slug = ?';
    params.push(category);
  }

  const rows = db.prepare(query).all(...params) as Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    time: number;
    ingredients: string;
    steps: string;
  }>;

  return rows.map(row => ({
    ...row,
    ingredients: JSON.parse(row.ingredients || '[]'),
    steps: JSON.parse(row.steps || '[]')
  }));
};

export const getRecipeById = (id: number): Recipe | undefined => {
  const row = db.prepare(`
    SELECT r.id, r.title, r.description, r.image, c.name as category, r.time, r.ingredients, r.steps
    FROM recipes r
    LEFT JOIN categories c ON r.category_id = c.id
    WHERE r.id = ?
  `).get(id) as {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    time: number;
    ingredients: string;
    steps: string;
  } | undefined;

  if (!row) return undefined;

  return {
    ...row,
    ingredients: JSON.parse(row.ingredients || '[]'),
    steps: JSON.parse(row.steps || '[]')
  };
};

export const searchRecipes = (query?: string, ingredients?: string): Recipe[] => {
  let sql = `
    SELECT r.id, r.title, r.description, r.image, c.name as category, r.time, r.ingredients, r.steps
    FROM recipes r
    LEFT JOIN categories c ON r.category_id = c.id
    WHERE 1=1
  `;
  const params: string[] = [];

  if (query) {
    sql += ' AND (r.title LIKE ? OR r.description LIKE ?)';
    params.push(`%${query}%`, `%${query}%`);
  }

  if (ingredients) {
    const ingredientList = ingredients.split(',').map(i => i.trim().toLowerCase());
    ingredientList.forEach(ing => {
      sql += ' AND LOWER(r.ingredients) LIKE ?';
      params.push(`%${ing}%`);
    });
  }

  const rows = db.prepare(sql).all(...params) as Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    time: number;
    ingredients: string;
    steps: string;
  }>;

  return rows.map(row => ({
    ...row,
    ingredients: JSON.parse(row.ingredients || '[]'),
    steps: JSON.parse(row.steps || '[]')
  }));
};

export const getAllCategories = (): Category[] => {
  return db.prepare('SELECT id, name, slug FROM categories').all() as Category[];
};

export const getAllFavorites = (): Favorite[] => {
  return db.prepare('SELECT id, recipe_id as recipeId, added_at as addedAt FROM favorites').all() as Favorite[];
};

export const addFavorite = (recipeId: number): Favorite => {
  const result = db.prepare('INSERT INTO favorites (recipe_id) VALUES (?)').run(recipeId);
  return {
    id: result.lastInsertRowid as number,
    recipeId,
    addedAt: new Date().toISOString()
  };
};

export const removeFavorite = (id: number): boolean => {
  const result = db.prepare('DELETE FROM favorites WHERE id = ?').run(id);
  return result.changes > 0;
};

export const removeFavoriteByRecipeId = (recipeId: number): boolean => {
  const result = db.prepare('DELETE FROM favorites WHERE recipe_id = ?').run(recipeId);
  return result.changes > 0;
};
