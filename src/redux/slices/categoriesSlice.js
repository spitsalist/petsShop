import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'http://localhost:3333/categories';

// Fetch all categories
export const fetchAllCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue({ message });
        }
    }
);

// Fetch category by ID
export const fetchCategoryById = createAsyncThunk(
    'categories/id',
    async (categoryId, thunkApi) => {
        try {
            const response = await axios.get(`${API_URL}/${categoryId}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkApi.rejectWithValue({ message });
        }
    }
);

const initialState = {
    categories: null,
    categoryData: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        resetState: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categoryData = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export const { resetState } = categoriesSlice.actions;
export default categoriesSlice.reducer;