import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.logo}>
          📖 Книга рецептов
        </Link>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Главная
          </Link>
          <Link
            to="/categories"
            className={`${styles.navLink} ${isActive('/categories') ? styles.active : ''}`}
          >
            Категории
          </Link>
          <Link
            to="/favorites"
            className={`${styles.navLink} ${isActive('/favorites') ? styles.active : ''}`}
          >
            ❤️ Избранное
          </Link>
          <Link
            to="/about"
            className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
          >
            О проекте
          </Link>
        </nav>
      </div>
    </header>
  );
};
