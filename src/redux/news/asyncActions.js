import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.ts';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const { data } = await axios.get(`/news`);
  return data;
});

export const fetchOneNews = createAsyncThunk('product/fetchOneNews', async (id) => {
  const { data } = await axios.get(`/news/${id}`);
  return data;
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id) => {
  const { data } = await axios.delete(`/news/${id}`);
  return data;
});

export const addNews = createAsyncThunk('news/addNews', async (newNewsObj) => {
  const { data } = await axios.post(`/news`, newNewsObj);
  return data;
});

export const updateNews = createAsyncThunk('news/updateNews', async (newNewsObj) => {
  const { data } = await axios.put(`/news`, newNewsObj);
  return data;
});
