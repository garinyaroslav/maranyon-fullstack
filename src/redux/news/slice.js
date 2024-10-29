import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './asyncActions';

const initialState = {
  items: [],
  status: 'loading',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.items = [];
      state.status = 'error';
    });
  },
});

export const {} = newsSlice.actions;
export default newsSlice.reducer;
