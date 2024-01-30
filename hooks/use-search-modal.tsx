import { create } from 'zustand';

type SearchModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
