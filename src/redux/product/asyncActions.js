import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.ts';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const { data } = await axios.get(`/product`);
  return data;
});

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id) => {
  const { data } = await axios.get(`/product/${id}`);
  return data;
});

export const addProduct = createAsyncThunk('product/addProduct', async (newProdObj) => {
  const { data } = await axios.post(`/product`, newProdObj);
  return data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  const { data } = await axios.delete(`/product/${id}`);
  return data;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async (newProdObj) => {
  const { data } = await axios.put(`/product`, newProdObj);
  return data;
});
