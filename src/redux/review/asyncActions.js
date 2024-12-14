import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.ts';

export const fetchReviews = createAsyncThunk('review/fetchReviews', async () => {
  const { data } = await axios.get(`/review`);
  return data;
});

export const fetchOneReview = createAsyncThunk('review/fetchOneReview', async (id) => {
  const { data } = await axios.get(`/review/${id}`);
  return data;
});

export const fetchReviewByNewsId = createAsyncThunk('review/fetchReviewByNewsId', async (id) => {
  const { data } = await axios.get(`/review?newsId=${id}`);
  return data;
});

export const deleteReview = createAsyncThunk('review/deleteReview', async (id) => {
  const { data } = await axios.delete(`/review/${id}`);
  return data;
});

export const addReview = createAsyncThunk('review/addReview', async (newReviewObj) => {
  const { data } = await axios.post(`/review`, newReviewObj);
  return data;
});

export const updateReview = createAsyncThunk('review/updateReview', async (newReviewObj) => {
  const { data } = await axios.put(`/review`, newReviewObj);
  return data;
});
