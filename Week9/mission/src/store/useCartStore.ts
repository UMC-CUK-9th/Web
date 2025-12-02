import { create } from 'zustand';
import cartItems from "../constants/cartItem";
import type { CartItems } from "../types/cart";


interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isOpen: boolean; 

  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}


export const useCartStore = create<CartState>((set, get) => ({

  cartItems: cartItems,
  amount: 0,
  total: 0,
  isOpen: false,


  increase: (id) => {
    set((state) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { cartItems: newCartItems };
    });
    get().calculateTotals(); 
  },

  decrease: (id) => {
    set((state) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === id && item.amount > 0) {

          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      return { cartItems: newCartItems };
    });
    get().calculateTotals();
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
    get().calculateTotals();
  },

  clearCart: () => {
    set((state) => {

      const newCartItems = state.cartItems.map((item) => ({
        ...item,
        amount: 0,
      }));
      return { cartItems: newCartItems };
    });
    get().calculateTotals();
  },

  calculateTotals: () => {
    set((state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });
      return { amount, total };
    });
  },


  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));