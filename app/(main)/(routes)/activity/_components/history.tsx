'use client';

import { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  format,
  sub,
  isSameDay,
  type Duration,
} from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { DateRange } from 'react-day-picker';
import toast from 'react-hot-toast';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Overview } from '@/components/overview';

import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';

interface SupabaseData {
  id: any;
  diet_type: any;
  diet_schedules: any;
  status: any;
  created_at: any;
}

interface GraphData {
  name: string;
  total: number;
}

export const History = ({ calories }: { calories: GraphData[] }) => {
  const ranges = [
    { label: 'Last 7 days', duration: { days: 7 } },
    { label: 'Last 14 days', duration: { days: 14 } },
    { label: 'Last 30 days', duration: { days: 30 } },
    { label: 'Last 3 months', duration: { months: 3 } },
    { label: 'Last 6 months', duration: { months: 6 } },
    { label: 'Last year', duration: { years: 1 } },
  ];

  const [date, setDate] = useState<DateRange | undefined>({
    from: sub(new Date(), { days: 14 }),
    to: new Date(),
  });
  const [foods, setFoods] = useState<SupabaseData[]>();
  const [exercises, setExercises] = useState<SupabaseData[]>();

  function isRangeSelected(duration: Duration) {
    return (
      isSameDay(date?.from!, sub(new Date(), duration)) &&
      isSameDay(date?.to!, new Date())
    );
  }

  function selectRange(duration: Duration) {
    setDate({ from: sub(new Date(), duration), to: new Date() });
  }

  const supabase = createClient();

  useEffect(() => {
    const fetchFoods = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('id, diet_type, diet_schedules, status, created_at')
        .eq('status', 'done')
        .eq('diet_type', 'diet')
        .gte('created_at', startOfMonth(date?.from!).toISOString())
        .lte(
          'created_at',
          endOfMonth(date?.to ? date.to : new Date()).toISOString()
        )
        .order('created_at', { ascending: false });

      if (error) {
        return toast.error('Something went wrong');
      }

      setFoods(data);
    };

    fetchFoods();
  }, [setDate, date]);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('id, diet_type, diet_schedules, status, created_at')
        .eq('status', 'done')
        .eq('diet_type', 'exercise')
        .gte('created_at', startOfMonth(date?.from!).toISOString())
        .lte(
          'created_at',
          endOfMonth(date?.to ? date.to : new Date()).toISOString()
        )
        .order('created_at', { ascending: false });

      if (error) {
        return toast.error('Something went wrong');
      }

      setExercises(data);
    };

    fetchExercises();
  }, [setDate, date]);

  return (
    <Tabs defaultValue="food" className="col-span-full">
      <TabsList className="grid grid-cols-2 w-[400px]">
        <TabsTrigger value="food">Food</TabsTrigger>
        <TabsTrigger value="exercise">Exercise</TabsTrigger>
      </TabsList>
      <TabsContent value="food">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Foods history</CardTitle>
            <CardDescription>
              All time specific about how much your calories intake.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Overview data={calories} param="kcal" />
            <div className="space-y-4 mt-8 w-full">
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger className="ml-auto" asChild>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn(
                        'w-[260px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} -{' '}
                            {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 flex items-center divide-x divide-gray-200 dark:divide-gray-800"
                    align="end"
                  >
                    <div className="flex flex-col gap-y-2 items-start justify-start">
                      {ranges.map((range) => (
                        <Button
                          variant="ghost"
                          key={range.label}
                          className={cn(
                            'rounded-none px-6 w-full',
                            isRangeSelected(range.duration)
                              ? 'bg-gray-100 dark:bg-gray-800'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          )}
                          onClick={() => selectRange(range.duration)}
                        >
                          {range.label}
                        </Button>
                      ))}
                    </div>
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <ScrollArea className="h-64">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {foods && foods.length > 0 ? (
                    foods.map((food) => (
                      <div
                        className="flex justify-between border shadow-sm rounded p-3"
                        key={food.id}
                      >
                        <div className="flex flex-col space-y-1">
                          <p className="font-medium leading-none capitalize">
                            {food.diet_schedules.name}
                          </p>
                          <p className="text-sm font-medium capitalize">
                            {food.diet_type}{' '}
                            <span className="text-muted-foreground lowercase">
                              {' '}
                              - {food.diet_schedules.time}
                            </span>
                          </p>
                          <p className="text-sm font-medium">
                            {food.diet_schedules.calories} kcal
                          </p>
                        </div>
                        <div className="text-xs font-medium ml-auto">
                          {format(new Date(food.created_at), 'PP')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center h-full">
                      <p className="text-xl font-semibold">
                        There is no data for this particular date
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="exercise">
        <Card className="col-span-full min-h-[30rem]">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-2">
              <CardTitle>Exercise history</CardTitle>
              <CardDescription>
                Specific information about your exercise.
              </CardDescription>
            </div>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'w-[260px] justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} -{' '}
                          {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 flex items-center divide-x divide-gray-200 dark:divide-gray-800"
                  align="end"
                >
                  <div className="flex flex-col gap-y-2 items-start justify-start">
                    {ranges.map((range) => (
                      <Button
                        variant="ghost"
                        key={range.label}
                        className={cn(
                          'rounded-none px-6 w-full',
                          isRangeSelected(range.duration)
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        )}
                        onClick={() => selectRange(range.duration)}
                      >
                        {range.label}
                      </Button>
                    ))}
                  </div>
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercises &&
                    exercises.map((exercise) => (
                      <div
                        className="flex justify-between border shadow-sm rounded p-3"
                        key={exercise.id}
                      >
                        <div className="flex flex-col space-y-1">
                          <p className="font-medium leading-none capitalize">
                            {exercise.diet_schedules.name}
                          </p>
                          <p className="text-sm font-medium text-muted-foreground capitalize">
                            {exercise.diet_type}
                          </p>
                          <p className="text-sm font-medium">
                            {exercise.diet_schedules.sets} set x{' '}
                            {exercise.diet_schedules.reps} repetition
                          </p>
                        </div>
                        <div className="text-xs font-medium ml-auto">
                          {format(new Date(exercise.created_at), 'PP')}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
