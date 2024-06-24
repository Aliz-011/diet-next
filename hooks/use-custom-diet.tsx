import { create } from 'zustand';

interface CustomDiet {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCustomDiet = create<CustomDiet>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCustomDiet;
