import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllFavorites, selectFavoritesStatus, selectAllRecipes } from '../../store/selectors';
import { fetchFavorites } from '../../store/favoritesSlice';
import { fetchRecipes } from '../../store/recipesSlice';
import { RecipeCard, Loader } from '../../components';
import styles from './Favorites.module.scss';

export const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectAllFavorites);
  const recipes = useAppSelector(selectAllRecipes);
  const status = useAppSelector(selectFavoritesStatus);

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchRecipes());
  }, [dispatch]);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.some((fav) => fav.recipeId === recipe.id)
  );

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className={styles.favorites}>
      <h1 className={styles.title}>❤️ Избранные рецепты</h1>
      
      {favoriteRecipes.length === 0 ? (
        <div className={styles.empty}>
          <p>У вас пока нет избранных рецептов</p>
          <p className={styles.hint}>
            Добавляйте рецепты в избранное, нажимая на сердечко на карточке рецепта
          </p>
        </div>
      ) : (
        <div className={styles.recipeGrid}>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};
