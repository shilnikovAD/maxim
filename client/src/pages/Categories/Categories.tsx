import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllCategories, selectAllRecipes, selectRecipesStatus } from '../../store/selectors';
import { fetchCategories } from '../../store/categoriesSlice';
import { fetchRecipes } from '../../store/recipesSlice';
import { RecipeCard, Card, Loader } from '../../components';
import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectAllCategories);
  const recipes = useAppSelector(selectAllRecipes);
  const status = useAppSelector(selectRecipesStatus);

  useEffect(() => {
    dispatch(fetchCategories());
    if (slug) {
      dispatch(fetchRecipes(slug));
    } else {
      dispatch(fetchRecipes());
    }
  }, [dispatch, slug]);

  const selectedCategory = categories.find((c) => c.slug === slug);
  const filteredRecipes = slug
    ? recipes.filter((r) => r.category === selectedCategory?.name)
    : recipes;

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <Loader size="large" />
      </div>
    );
  }

  if (slug && !selectedCategory) {
    return (
      <div className={styles.notFound}>
        <h2>Категория не найдена</h2>
        <button onClick={() => navigate('/categories')}>К списку категорий</button>
      </div>
    );
  }

  return (
    <div className={styles.categories}>
      {slug ? (
        <>
          <button className={styles.backBtn} onClick={() => navigate('/categories')}>
            ← Все категории
          </button>
          <h1 className={styles.title}>{selectedCategory?.name}</h1>
          {filteredRecipes.length === 0 ? (
            <p className={styles.empty}>В этой категории пока нет рецептов</p>
          ) : (
            <div className={styles.recipeGrid}>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className={styles.title}>Категории рецептов</h1>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Card
                key={category.id}
                hoverable
                onClick={() => navigate(`/categories/${category.slug}`)}
                className={styles.categoryCard}
              >
                <span className={styles.categoryName}>{category.name}</span>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
