// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addItem: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//   },
// });

// export const { addItem, removeItem } = cartSlice.actions;
// export default cartSlice.reducer;




// redux/slices/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   totalQuantity: 0,
//   totalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.items.find(item => item.id === newItem.id);
//       state.totalQuantity++;
//       state.totalAmount += newItem.price;
//       if (!existingItem) {
//         state.items.push({
//           id: newItem.id,
//           title: newItem.title,
//           price: newItem.price,
//           quantity: 1,
//           totalPrice: newItem.price,
//           image: newItem.image,
//         });
//       } else {
//         existingItem.quantity++;
//         existingItem.totalPrice += newItem.price;
//       }
//     },
//     removeFromCart(state, action) {
//       const id = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (!existingItem) {
//         console.error(`Item with id ${id} not found in cart`);
//         return;
//       }
//       state.totalQuantity--;
//       state.totalAmount -= existingItem.price;
//       if (existingItem.quantity === 1) {
//         state.items = state.items.filter(item => item.id !== id);
//       } else {
//         existingItem.quantity--;
//         existingItem.totalPrice -= existingItem.price;
//         if (existingItem.quantity === 0) {
//           state.items = state.items.filter(item => item.id !== id);
//         }
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalAmount = 0;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   totalQuantity: 0,
//   totalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.items.find(item => item.id === newItem.id);
//       state.totalQuantity++;
//       state.totalAmount += newItem.price;
//       if (!existingItem) {
//         state.items.push({
//           id: newItem.id,
//           title: newItem.title,
//           price: newItem.price,
//           quantity: 1,
//           totalPrice: newItem.price,
//           image: newItem.image,
//         });
//       } else {
//         existingItem.quantity++;
//         existingItem.totalPrice += newItem.price;
//       }
//     },
//     removeFromCart(state, action) {
//       const id = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (!existingItem) {
//         console.error(`Item with id ${id} not found in cart`);
//         return;
//       }
//       state.totalQuantity--;
//       state.totalAmount -= existingItem.price;
//       if (existingItem.quantity === 1) {
//         state.items = state.items.filter(item => item.id !== id);
//       } else {
//         existingItem.quantity--;
//         existingItem.totalPrice -= existingItem.price;
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalAmount = 0;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;




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