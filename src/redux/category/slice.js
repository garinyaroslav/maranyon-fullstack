import { createSlice } from '@reduxjs/toolkit';
import { fetchProdByCategory } from './asyncActions';

const initialState = {
  products: [],
  categoryName: 'Все',
  status: 'loading',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setProductName: (state, action) => {
      state.categoryName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProdByCategory.pending, (state) => {
      state.products = [];
      state.status = 'loading';
    });
    builder.addCase(fetchProdByCategory.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProdByCategory.rejected, (state) => {
      state.products = [];
      state.status = 'error';
    });
  },
});

export const { setProductName } = categorySlice.actions;
export default categorySlice.reducer;
