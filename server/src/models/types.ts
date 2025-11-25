export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  time: number;
  ingredients: string[];
  steps: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Favorite {
  id: number;
  recipeId: number;
  addedAt: string;
}
