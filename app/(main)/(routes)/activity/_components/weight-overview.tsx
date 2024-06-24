'use client';

import { useCallback, useEffect, useState } from 'react';
import { sub, isSameDay, format, type Duration } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from './overview';
import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/hooks/use-user';

interface GraphData {
  date: string;
  weight: number;
}

export const WeightOverview = () => {
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
      const { data: antropometri, error } = await supabase
        .from('antropemetri')
        .select('id, weight, created_at')
        .eq('user_id', user?.id)
        .lte('created_at', formattedDate(date.to as Date))
        .gte('created_at', formattedDate(date.from as Date))
        .order('created_at', { ascending: true });

      const response = antropometri?.map((item) => ({
        date: format(new Date(item.created_at), 'dd-MM-yyyy'),
        weight: item.weight as number,
      })) as GraphData[];
      setData(response);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  }, [date.from, date.to, setData, user?.id]);

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>Weight overview</CardTitle>
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
      </CardHeader>
      <CardContent className="pl-2 h-full">
        {data && <Overview data={data} param="kg" />}
      </CardContent>
    </Card>
  );
};
