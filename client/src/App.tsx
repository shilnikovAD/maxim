import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './components';
import { Home } from './pages/Home';
import { Recipe } from './pages/Recipe';
import { Favorites } from './pages/Favorites';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:slug" element={<Categories />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
