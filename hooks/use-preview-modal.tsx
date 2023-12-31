import { Food } from '@/types';
import { create } from 'zustand';

interface PreviewModalProps {
  isOpen: boolean;
  data?: Food;
  onOpen: (data: Food) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Food) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
