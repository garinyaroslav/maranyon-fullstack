import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
  return data;
});

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`);
  return data;
});

export const addProduct = createAsyncThunk('product/addProduct', async (newProdObj) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, newProdObj);
  return data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${id}`);
  return data;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async (newProdObj) => {
  const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/product`, newProdObj);
  return data;
});
