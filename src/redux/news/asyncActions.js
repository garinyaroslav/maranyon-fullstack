import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/news`);
  return data;
});
