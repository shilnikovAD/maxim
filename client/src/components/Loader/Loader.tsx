import React from 'react';
import styles from './Loader.module.scss';

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
}

export const Loader: React.FC<LoaderProps> = ({ size = 'medium' }) => {
  return (
    <div className={`${styles.loader} ${styles[size]}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};
