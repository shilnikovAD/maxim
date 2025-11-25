import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectAllRecipes,
  selectRecipesStatus,
  selectAllCategories,
  selectSearchResults,
  selectSearchStatus,
} from '../../store/selectors';
import { fetchRecipes, searchRecipes, clearSearchResults } from '../../store/recipesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { fetchFavorites } from '../../store/favoritesSlice';
import { SearchBar, RecipeCard, Loader, Card } from '../../components';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recipes = useAppSelector(selectAllRecipes);
  const categories = useAppSelector(selectAllCategories);
  const searchResults = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectRecipesStatus);
  const searchStatus = useAppSelector(selectSearchStatus);

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchCategories());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleSearch = (query: string, ingredients: string) => {
    if (query || ingredients) {
      dispatch(searchRecipes({ query, ingredients }));
    } else {
      dispatch(clearSearchResults());
    }
  };

  const displayedRecipes = searchResults.length > 0 ? searchResults : recipes;
  const isSearching = searchStatus === 'loading';

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>📖 Книга рецептов</h1>
        <p className={styles.subtitle}>Найдите идеальный рецепт для вашего ужина</p>
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Категории</h2>
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
      </section>

      <section className={styles.recipes}>
        <h2 className={styles.sectionTitle}>
          {searchResults.length > 0 ? 'Результаты поиска' : 'Популярные рецепты'}
        </h2>
        {(status === 'loading' || isSearching) && <Loader />}
        {status === 'failed' && (
          <p className={styles.error}>Ошибка загрузки рецептов. Попробуйте позже.</p>
        )}
        {status === 'succeeded' && displayedRecipes.length === 0 && (
          <p className={styles.empty}>Рецепты не найдены</p>
        )}
        <div className={styles.recipeGrid}>
          {displayedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};
