import React from 'react';
import styles from './About.module.scss';

export const About: React.FC = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>О проекте</h1>
      
      <section className={styles.section}>
        <h2>📖 Книга рецептов</h2>
        <p>
          Книга рецептов — это современное веб-приложение для поиска и сохранения
          кулинарных рецептов. Найдите идеальное блюдо по названию или ингредиентам,
          которые есть у вас дома.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🛠️ Технологии</h2>
        <ul className={styles.techList}>
          <li><strong>Frontend:</strong> React, TypeScript, Redux Toolkit</li>
          <li><strong>Маршрутизация:</strong> React Router</li>
          <li><strong>Backend:</strong> Node.js, Express</li>
          <li><strong>База данных:</strong> SQLite</li>
          <li><strong>Стилизация:</strong> SCSS Modules</li>
          <li><strong>Тестирование:</strong> Vitest, Playwright, Storybook</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>✨ Возможности</h2>
        <ul className={styles.featureList}>
          <li>🔍 Поиск рецептов по названию</li>
          <li>🥗 Поиск по ингредиентам</li>
          <li>📂 Просмотр рецептов по категориям</li>
          <li>❤️ Сохранение рецептов в избранное</li>
          <li>📱 Адаптивный дизайн</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>👨‍💻 Разработка</h2>
        <p>
          Проект разработан в рамках учебного задания с использованием современного
          стека технологий и лучших практик разработки веб-приложений.
        </p>
      </section>
    </div>
  );
};
