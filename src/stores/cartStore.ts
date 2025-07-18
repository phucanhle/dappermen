import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartItem } from "@/types/CartItem";

type CartStore = {
  items: cartItem[];
  addItem: (item: cartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      getTotalQuantity: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
      addItem: (item) => {
        const existingIndex = get().items.findIndex(
          (i) => i.id === item.id && i.size === item.size
        );

        if (existingIndex !== -1) {
          const updated = [...get().items];
          updated[existingIndex].quantity += item.quantity;
          set({ items: updated });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, qty) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
