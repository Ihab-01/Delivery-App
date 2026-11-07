import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type CartItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: any;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item._id === action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
    removeDishFromCart: (state, action: PayloadAction<string>) => {
    state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, removeDishFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsWithId = (state: RootState, id: string) =>
  state.cart.items.filter((item: CartItem) => item._id === id);

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total: number, item: CartItem) => total + item.price, 0);

export default cartSlice.reducer;