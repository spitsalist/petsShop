import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import cartReducer from './slices/cartSlice';
// import productReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    // products: productReducer,
  },
});