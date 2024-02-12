'use client';

import { TourProvider } from '@reactour/tour';

export const steps = [
  {
    selector: '#section-tabs',
    content:
      'You can choose which diet you feel needs to. But you have to provide your additional information such as weight, height etc.',
  },
  {
    selector: '#muscle-groups',
    content:
      'If you want to see an exercises in a specific muscle group you can choose between these options',
  },
  {
    selector: '#history',
    content: 'This section contains the history of your previous sessions',
  },
];

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <TourProvider steps={steps} scrollSmooth>
      {children}
    </TourProvider>
  );
};

export default Container;
