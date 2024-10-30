import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/slice';
import categoriesReducer from './category/slice';
import cartReducer from './cart/slice';
import newsReducer from './news/slice';
import reviewReducer from './review/slice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    news: newsReducer,
    review: reviewReducer,
  },
});
