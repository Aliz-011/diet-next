'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  AreaChart,
  Home,
  CalendarCheck2,
  Heart,
  Plus,
  Dumbbell,
  Pizza,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from './ui/label';

const routes = [
  {
    label: 'Home',
    icon: (
      <Home className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/',
  },
  {
    label: 'Activity',
    icon: (
      <AreaChart className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/activity',
  },
  {
    cta: <Plus />,
  },
  {
    label: 'Schedules',
    icon: (
      <CalendarCheck2 className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/schedule',
  },
  {
    label: 'Favorite',
    icon: (
      <Heart className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/favorite',
  },
];

const BottomBar = () => {
  const [open, setOpen] = useState(false);
  const [dietKind, setDietKind] = useState('');

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t py-3 bg-background">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {routes.map((route, i) =>
          route.cta ? (
            <Button
              className="rounded-full mb-4 mx-auto"
              size="icon"
              id="cta"
              onClick={() => setOpen(true)}
              key={i}
            >
              {route.cta}
            </Button>
          ) : (
            <Link
              key={route.label}
              href={route.path}
              className="inline-flex flex-col items-center justify-center px-5 group"
            >
              {route.icon}
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                {route.label}
              </span>
            </Link>
          )
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[425px] md:max-w-lg">
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>New Diet</DialogTitle>
            <DialogDescription>
              Create a new diet plan. Track your progress and stay motivated!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup
              defaultValue="card"
              onValueChange={(e) => setDietKind(e)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="food"
                  id="food"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="food"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Pizza className="mb-3 h-6 w-6" />
                  Food
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="exercise"
                  id="exercise"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="exercise"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Dumbbell className="mb-3 h-6 w-6" />
                  Exercise
                </Label>
              </div>
            </RadioGroup>
            <Button>Continue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BottomBar;
