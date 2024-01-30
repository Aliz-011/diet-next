'use client';

import { useEffect } from 'react';
import { useTour } from '@reactour/tour';

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useTour();

  useEffect(() => {
    const walkthrough = () => {
      if (localStorage.getItem(`dietTour`) !== 'true') {
        setIsOpen(true);
        localStorage.setItem(`dietTour`, 'true');
      }
    };
    walkthrough();
  }, [setIsOpen]);

  return <>{children}</>;
};
