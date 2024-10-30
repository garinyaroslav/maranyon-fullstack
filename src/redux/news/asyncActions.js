import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/news`);
  return data;
});

export const fetchOneNews = createAsyncThunk('product/fetchOneNews', async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/${id}`);
  return data;
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id) => {
  const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/news/${id}`);
  return data;
});

export const addNews = createAsyncThunk('news/addNews', async (newNewsObj) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/news`, newNewsObj);
  return data;
});

export const updateNews = createAsyncThunk('news/updateNews', async (newNewsObj) => {
  const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/news`, newNewsObj);
  return data;
});
