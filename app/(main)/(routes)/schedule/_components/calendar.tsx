'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/hooks/use-user';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { createClient } from '@/utils/supabase/client';
import { cn } from '@/lib/utils';

type SchedulePlan = {
  id: string;
  diet_type: string;
  diet_schedules: any;
  status: string;
  created_at: string | Date | number;
};

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState<SchedulePlan[]>([]);
  const supabase = createClient();
  const router = useRouter();
  const { user } = useUser();
  const confetti = useConfettiStore();

  useEffect(() => {
    const getPlans = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('id, diet_type,diet_schedules,status,created_at')
        .eq('user_id', user?.id)
        .order('status', { ascending: false });

      if (!error) {
        setCurrentEvents(data);
      } else {
        console.log('loading...');
      }
    };
    getPlans();
  }, [supabase, setCurrentEvents, user]);

  const handleEventClick = async (selected: EventClickArg) => {
    try {
      const { error } = await supabase
        .from('schedules')
        .update({
          status: 'done',
        })
        .eq('user_id', user?.id)
        .eq('id', selected.event.id);

      if (error) throw error;

      confetti.onOpen();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="my-5">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-4 h-96">
          <ScrollArea className="h-72 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Plans</h4>
              {currentEvents.length <= 0 && (
                <p className="text-sm font-semibold text-muted-foreground text-center">
                  No plans yet.
                </p>
              )}
              {currentEvents.length > 0 &&
                currentEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      'my-2.5 rounded-sm border p-3',
                      event.status === 'done' ? 'bg-green-100' : 'bg-red-100'
                    )}
                  >
                    <h3 className="capitalize font-semibold">
                      {event.diet_schedules.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.created_at).toLocaleString('us-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      <span className="font-semibold uppercase">
                        ({event.status})
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="ml-4">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
              }}
              initialView="dayGridMonth"
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              eventClick={handleEventClick}
              events={currentEvents
                .filter((event) => event.status === 'on my way')
                .map((event) => ({
                  id: event.id,
                  title: event.diet_schedules.name,
                  date: event.created_at,
                }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
