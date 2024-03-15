'use client';

import { useCallback, useEffect, useState } from 'react';
import { sub, isSameDay, format, type Duration } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Overview } from '@/components/overview';
import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/hooks/use-user';

interface GraphData {
  date: string;
  calories: number;
  burned: number;
}

export const CaloriesOverview = () => {
  const supabase = createClient();
  const { user } = useUser();
  const [data, setData] = useState<GraphData[]>([]);
  const [date, setDate] = useState<DateRange>({
    from: sub(new Date(), { days: 30 }),
    to: new Date(),
  });

  const ranges = [
    { label: '1d', duration: { days: 1 } },
    { label: '7d', duration: { days: 7 } },
    { label: '14d', duration: { days: 14 } },
    { label: '30d', duration: { days: 30 } },
    { label: '3M', duration: { months: 3 } },
    { label: '6M', duration: { months: 6 } },
    { label: '1y', duration: { years: 1 } },
  ];

  function isRangeSelected(duration: Duration) {
    return (
      isSameDay(date?.from!, sub(new Date(), duration)) &&
      isSameDay(date?.to!, new Date())
    );
  }

  function selectRange(duration: Duration) {
    setDate({ from: sub(new Date(), duration), to: new Date() });
  }

  const formattedDate = (value: Date) => {
    return new Date(value).toISOString();
  };

  const fetchGraphData = useCallback(async () => {
    try {
      const { data: schedules, error } = await supabase
        .from('schedules')
        .select('id, diet_schedules, status, created_at')
        .eq('user_id', user?.id)
        .eq('status', 'done')
        .lte('created_at', formattedDate(date.to as Date))
        .gte('created_at', formattedDate(date.from as Date));

      if (error) {
        throw new Error(error.message);
      }

      const graphData: { [day: number]: GraphData } = {}; // Object to hold data for each day

      schedules.forEach((item) => {
        const day = new Date(item.diet_schedules.dte).getDay();
        const formattedDate = format(
          new Date(item.diet_schedules.dte),
          'dd-MM-yyyy'
        );

        if (!graphData[day]) {
          graphData[day] = { date: formattedDate, burned: 0, calories: 0 }; // Initialize if not exists
        }

        graphData[day].calories += item.diet_schedules.calories;
        graphData[day].burned += item.diet_schedules.burned;
      });

      setData(Object.values(graphData));
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  }, [date.from, date.to, setData, user?.id]);

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 w-full justify-end">
        {ranges.map((range) => (
          <button
            key={range.label}
            onClick={() => selectRange(range.duration)}
            className={cn(
              isRangeSelected(range.duration)
                ? buttonVariants({ variant: 'default', size: 'sm' })
                : buttonVariants({ variant: 'ghost', size: 'sm' })
            )}
          >
            {range.label}
          </button>
        ))}
      </div>
      {data && <Overview data={data} param="cal" />}
    </div>
  );
};
