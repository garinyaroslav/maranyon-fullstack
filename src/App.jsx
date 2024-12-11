import { Routes, Route } from 'react-router-dom';

import { Home, NotFound, Categories, FullProduct, AdminPanel, News } from './pages';
import { MainLayout } from './layouts/MainLayout';

export const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/product/:id" element={<FullProduct />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
