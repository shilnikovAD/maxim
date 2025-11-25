import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import styles from './SearchBar.module.scss';

export interface SearchBarProps {
  onSearch: (query: string, ingredients: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, ingredients);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <Input
          value={query}
          onChange={setQuery}
          placeholder="Название блюда..."
          type="search"
        />
        <Input
          value={ingredients}
          onChange={setIngredients}
          placeholder="Ингредиенты (через запятую)..."
          type="search"
        />
      </div>
      <Button type="submit" variant="primary" size="large">
        🔍 Найти
      </Button>
    </form>
  );
};
