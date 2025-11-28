import type { CartItems } from "../types/cart";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import rawCartItems from "../constants/cartItems";
import { useShallow } from "zustand/react/shallow";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

const initialCartItems: CartItems = rawCartItems.map((item) => ({
  ...item,
  price: Number(item.price),
}));

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: initialCartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item: { id: string; }) => item.id === id);
          if (item) {
            item.amount++;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item: { id: string; }) => item.id === id);
          if (item && item.amount > 0) {
            item.amount--;
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item: { id: string; }) => item.id !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item: { amount: number; price: number; }) => {
            amount += item.amount;
            total += item.amount * item.price;
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartActions = () => useCartStore((state) => state.actions);
