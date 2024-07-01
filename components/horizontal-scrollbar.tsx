'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

import { bodyParts } from '@/utils/data';
import Heading from './heading';

const HorizontalScrollbar = () => {
  return (
    <section className="pt-10 px-4 xl:px-0" id="muscle-groups">
      <Heading
        title="Muscle Groups"
        subtitle="Cari exercise berdasarkan otot grup"
      />

      <div className="flex w-full items-start gap-8 overflow-x-auto bg-background py-5 scrollbar-thin scrollbar-thumb-input scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        {bodyParts.map((item) => (
          <Link
            key={item}
            href={`/search/${item}`}
            className="flex shrink-0 flex-col items-center justify-center gap-2 w-[180px] max-w-[180px] h-[130px] max-h-[130px] rounded px-2 py-5 bg-gray-100 dark:bg-slate-800"
          >
            <Dumbbell className="h-10 w-10 text-red-500" />

            <p className="text-center capitalize font-medium">{item}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollbar;
