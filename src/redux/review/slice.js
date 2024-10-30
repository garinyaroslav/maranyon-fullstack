import { createSlice } from '@reduxjs/toolkit';
import { fetchReviews } from './asyncActions';

const initialState = {
  items: [],
  status: 'loading',
};

const reviewSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchReviews.rejected, (state) => {
      state.items = [];
      state.status = 'error';
    });
  },
});

export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
