import { create } from 'zustand';

interface CustomExercise {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCustomExercise = create<CustomExercise>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCustomExercise;
