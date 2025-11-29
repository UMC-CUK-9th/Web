import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItem[];
  total: number;
  amount: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  total: 0,
  amount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += Number(item.price) * item.amount;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
