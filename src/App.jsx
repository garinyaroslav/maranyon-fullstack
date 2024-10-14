import { Routes, Route } from "react-router-dom";

import { Home, NotFound, Categories, FullProduct } from "./pages";
import { MainLayout } from "./layouts/MainLayout";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/product/:id" element={<FullProduct />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
