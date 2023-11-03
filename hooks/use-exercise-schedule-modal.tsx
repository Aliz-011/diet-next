import { Exercises } from '@/types';
import { create } from 'zustand';

interface ExerciseScheduleModalProps {
  isOpen: boolean;
  data?: Exercises;
  onOpen: (data: Exercises) => void;
  onClose: () => void;
}

const useExerciseScheduleModal = create<ExerciseScheduleModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Exercises) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useExerciseScheduleModal;
