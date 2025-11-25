import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSelectedRecipe, selectRecipesStatus } from '../../store/selectors';
import { fetchRecipeById, clearSelected } from '../../store/recipesSlice';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { selectIsFavorite } from '../../store/selectors';
import { Button, Loader } from '../../components';
import styles from './Recipe.module.scss';

export const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recipe = useAppSelector(selectSelectedRecipe);
  const status = useAppSelector(selectRecipesStatus);
  const isFavorite = useAppSelector(selectIsFavorite(Number(id)));

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(Number(id)));
    }
    return () => {
      dispatch(clearSelected());
    };
  }, [dispatch, id]);

  const handleFavoriteClick = () => {
    if (recipe) {
      if (isFavorite) {
        dispatch(removeFavorite(recipe.id));
      } else {
        dispatch(addFavorite(recipe.id));
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <Loader size="large" />
      </div>
    );
  }

  if (status === 'failed' || !recipe) {
    return (
      <div className={styles.error}>
        <h2>Рецепт не найден</h2>
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </div>
    );
  }

  return (
    <div className={styles.recipe}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img src={recipe.image} alt={recipe.title} className={styles.image} />
        </div>

        <div className={styles.details}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{recipe.title}</h1>
            <Button
              variant={isFavorite ? 'primary' : 'outline'}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
            </Button>
          </div>

          <p className={styles.description}>{recipe.description}</p>

          <div className={styles.meta}>
            <span className={styles.category}>{recipe.category}</span>
            <span className={styles.time}>⏱️ {recipe.time} мин</span>
          </div>

          <section className={styles.section}>
            <h2>Ингредиенты</h2>
            <ul className={styles.ingredients}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Пошаговая инструкция</h2>
            <ol className={styles.steps}>
              {recipe.steps.map((step, index) => (
                <li key={index}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <span className={styles.stepText}>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};
