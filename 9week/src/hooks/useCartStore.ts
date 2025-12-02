import { create } from 'zustand';
import type { CartItem } from '../constants/cartItems';
import { mockCartItems } from '../constants/cartItems';

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isOpen: boolean;
}

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useCartStore = create<CartState & CartActions>((set) => ({
  cartItems: mockCartItems,
  amount: 0,
  total: 0,
  isOpen: false,

  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0),
    })),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () =>
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    }),

  calculateTotals: () =>
    set((state) => {
      const amount = state.cartItems.reduce((sum, i) => sum + i.amount, 0);
      const total = state.cartItems.reduce((sum, i) => sum + i.amount * i.price, 0);
      return { amount, total };
    }),

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
