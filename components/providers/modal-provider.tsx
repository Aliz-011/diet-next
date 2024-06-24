'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/modals/auth-modal';
import PreviewModal from '@/components/modals/preview-modal';
import ExerciseScheduleModal from '@/components/modals/exercise-schedule-modal';
import DietScheduleModal from '@/components/modals/diet-schedule-modal';
import SearchModal from '@/components/modals/search-modal';
import CustomDietModal from '@/components/modals/custom-diet-modal';
import CustomExerciseModal from '@/components/modals/custom-exercise-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <PreviewModal />
      <ExerciseScheduleModal />
      <DietScheduleModal />
      <SearchModal />
      <CustomDietModal />
      <CustomExerciseModal />
    </>
  );
};

export default ModalProvider;
