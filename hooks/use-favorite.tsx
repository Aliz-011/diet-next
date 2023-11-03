import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Food } from '@/types';

interface FavoriteStore {
  items: Food[];
  isFavorite: Record<number, boolean>;
  addItem: (data: Food) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

const useFavorite = create(
  persist<FavoriteStore>(
    (set, get) => ({
      items: [],
      isFavorite: {}, // Initialize an object to store isFavorite status
      addItem: (data: Food) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast('Item already in favorite.');
        }

        // Update the isFavorite status for the added item
        const updatedIsFavorite = { ...get().isFavorite, [data.id]: true };

        set({ items: [...get().items, data], isFavorite: updatedIsFavorite });
        toast.success('Item added to favorite.');
      },
      removeItem: (id: number) => {
        // Update the isFavorite status for the removed item
        const updatedIsFavorite = { ...get().isFavorite };
        delete updatedIsFavorite[id];

        set({
          items: [...get().items.filter((item) => item.id !== id)],
          isFavorite: updatedIsFavorite,
        });
        toast.success('Item removed from favorite.');
      },
      removeAll: () => {
        // Clear the isFavorite status for all items
        set({ items: [], isFavorite: {} });
      },
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFavorite;
