import { create } from "zustand";
import { persist } from "zustand/middleware";
import Product from "@/types/Products";

type FavouritesStore = {
  items: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (id: number) => boolean;
};

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleFavourite: (product) => {
        const items = get().items;
        const exists = items.some((i) => i.id === product.id);
        
        if (exists) {
          set({ items: items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      
      isFavourite: (id) => {
        return get().items.some((i) => i.id === id);
      }
    }),
    {
      name: "favourites-storage"
    }
  )
);
