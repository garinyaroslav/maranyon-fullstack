import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts, fetchProduct } from './asyncActions';

const initialState = {
  items: [],
  status: 'loading',
  item: {},
  itemStatus: 'loading',
  itemCount: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    itemCountAdd: (state) => {
      state.itemCount++;
    },
    itemCountPut: (state) => {
      if (state.itemCount !== 1) state.itemCount--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.items = [];
      state.status = 'error';
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.item = [];
      state.itemStatus = 'loading';
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.item = action.payload;
      state.itemCount = 1;
      state.itemStatus = 'success';
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.item = [];
      state.itemStatus = 'error';
    });
  },
});

export const { itemCountAdd, itemCountPut } = productSlice.actions;
export default productSlice.reducer;
