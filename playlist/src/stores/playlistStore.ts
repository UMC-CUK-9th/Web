import { create } from "zustand";
import cartItemsData from "../constants/cartItems";

export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface PlaylistStore {
  cartItems: CartItem[];
  total: number;
  amount: number;

  isModalOpen: boolean;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;

  openModal: () => void;
  closeModal: () => void;
}

const calcTotals = (items: CartItem[]) => {
  const amount = items.reduce((sum, item) => sum + item.amount, 0);
  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.amount,
    0
  );
  return { amount, total };
};

const initialTotals = calcTotals(cartItemsData);

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  cartItems: cartItemsData,
  total: initialTotals.total,
  amount: initialTotals.amount,

  isModalOpen: false,

  increase: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      const totals = calcTotals(updated);
      return { cartItems: updated, ...totals };
    }),

  decrease: (id) =>
    set((state) => {
      const updated = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);

      const totals = calcTotals(updated);
      return { cartItems: updated, ...totals };
    }),

  clearCart: () =>
    set(() => ({
      cartItems: [],
      total: 0,
      amount: 0,
    })),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
