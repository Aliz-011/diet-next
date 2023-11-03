'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/modals/auth-modal';
import PreviewModal from '../modals/preview-modal';
import ExerciseScheduleModal from '../modals/exercise-schedule-modal';
import DietScheduleModal from '../modals/diet-schedule-modal';

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
    </>
  );
};

export default ModalProvider;
