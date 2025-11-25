import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../Card';
import { Recipe } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsFavorite } from '../../store/selectors';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import styles from './RecipeCard.module.scss';

export interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(recipe.id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(recipe.id));
    } else {
      dispatch(addFavorite(recipe.id));
    }
  };

  return (
    <Card hoverable onClick={() => navigate(`/recipe/${recipe.id}`)} className={styles.recipeCard}>
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt={recipe.title} className={styles.image} />
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.meta}>
          <span className={styles.category}>{recipe.category}</span>
          <span className={styles.time}>⏱️ {recipe.time} мин</span>
        </div>
      </div>
    </Card>
  );
};
