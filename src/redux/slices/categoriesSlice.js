// src/redux/slices/categoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId) => {
    const response = await axios.get(`http://localhost:3333/categories/${categoryId}`);
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoryData: null,
    isLoading: false,
    isError: false,
    message: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;