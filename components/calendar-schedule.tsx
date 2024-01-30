'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { DateFormatter } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import Heading from './heading';

const seasonEmoji: Record<string, string> = {
  winter: '⛄️',
  spring: '🌸',
  summer: '🌻',
  autumn: '🍂',
};

const getSeason = (month: Date): string => {
  const monthNumber = month.getMonth();
  if (monthNumber >= 0 && monthNumber < 3) return 'winter';
  if (monthNumber >= 3 && monthNumber < 6) return 'spring';
  if (monthNumber >= 6 && monthNumber < 9) return 'summer';
  else return 'autumn';
};

const formatCaption: DateFormatter = (month, options) => {
  const season = getSeason(month);
  return (
    <>
      <span role="img" aria-label={season}>
        {seasonEmoji[season]}
      </span>{' '}
      {format(month, 'LLLL', { locale: options?.locale })}
    </>
  );
};

const CaledarSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="pb-10 mx-auto space-y-2 overflow-x-auto w-full">
      <Heading
        title="My Schedule"
        subtitle="Exercise that you pick will be shown here."
      />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow w-full"
        formatters={{ formatCaption }}
        showOutsideDays
        fixedWeeks
      />
    </div>
  );
};

export default CaledarSchedule;
