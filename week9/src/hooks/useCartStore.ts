import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import type { Lp, CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

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

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,

    actions: {
      increase: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((it: Lp) => it.id === id);
          if (item) {
            item.amount++;
          }
        });
      },

      decrease: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((it: Lp) => it.id === id);
          if (item && item.amount > 0) {
            item.amount--;
          }
        });
      },

      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter(
            (it: Lp) => it.id !== id
          );
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

          state.cartItems.forEach((it: Lp) => {
            amount += it.amount;
            total += it.amount * it.price;
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


export const useCartActions = () =>
  useCartStore((state) => state.actions);
