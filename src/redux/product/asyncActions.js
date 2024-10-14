import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product`,
    );
    return data;
  },
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/product/${id}`,
    );
    return data;
  },
);
