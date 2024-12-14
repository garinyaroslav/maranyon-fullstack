import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProdByCategory = createAsyncThunk('category/fetchProdByCategory', async (params) => {
  const url = new URL(`${process.env.REACT_APP_BASE_URL}/product`);
  if (params) url.searchParams.append('category', params);

  const { data } = await axios.get(url);
  return data;
});
