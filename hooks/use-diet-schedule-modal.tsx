import { Food } from '@/types';
import { create } from 'zustand';

interface DietScheduleModalProps {
  isOpen: boolean;
  data?: Food;
  onOpen: (data: Food) => void;
  onClose: () => void;
}

const useDietScheduleModal = create<DietScheduleModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Food) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDietScheduleModal;
