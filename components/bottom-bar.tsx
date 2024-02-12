'use client';

import Link from 'next/link';
import { AreaChart, Home, CalendarCheck2, Heart } from 'lucide-react';

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
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t py-3 bg-background">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {routes.map((route, i) => (
          <Link
            key={i}
            href={route.path}
            className="inline-flex flex-col items-center justify-center px-5 group"
          >
            {route.icon}
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              {route.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
