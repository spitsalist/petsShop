import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalAmount: JSON.parse(localStorage.getItem('totalAmount')) || 0,
};

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('cartItems', JSON.stringify(state.items));
  localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
      state.totalAmount += action.payload.price;
      saveStateToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== action.payload);
      }
      saveStateToLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
        state.totalAmount += existingItem.price;
      }
      saveStateToLocalStorage(state);
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
        state.totalAmount -= existingItem.price;
      }
      saveStateToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      saveStateToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;