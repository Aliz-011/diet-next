'use client';

import { BiHomeAlt2, BiLineChart } from 'react-icons/bi';
import { AiOutlinePlus, AiOutlineHeart } from 'react-icons/ai';
import { BsCalendar } from 'react-icons/bs';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useState } from 'react';

const routes = [
  {
    label: 'Home',
    icon: (
      <BiHomeAlt2 className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/',
  },
  {
    label: 'Activity',
    icon: (
      <BiLineChart className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/activity',
  },
  {
    cta: <AiOutlinePlus />,
  },
  {
    label: 'Schedules',
    icon: (
      <BsCalendar className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/schedule',
  },
  {
    label: 'Favorite',
    icon: (
      <AiOutlineHeart className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    path: '/favorite',
  },
];

const BottomBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t py-3 bg-background">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {routes.map((route, i) =>
          route.cta ? (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="rounded-full mb-4 mx-auto"
                    size="icon"
                    onClick={() => setOpen(true)}
                  >
                    {route.cta}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-x-1">
                    Start・
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                      &#8984;&nbsp;K
                    </kbd>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            <DialogTitle>New Diet Plan</DialogTitle>
            <DialogDescription>
              Create a new diet plan to track your progress and stay motivated!
            </DialogDescription>
          </DialogHeader>
          <div>{/*  */}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BottomBar;
