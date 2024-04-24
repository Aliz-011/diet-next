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

import { useUser } from '@/hooks/use-user';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { createClient } from '@/utils/supabase/client';

type SchedulePlan = {
  id: string;
  diet_type: string;
  diet_schedules: Record<string, any>;
  status: string;
  created_at: Date | number;
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
        .eq('status', 'on my way')
        .order('status', { ascending: false });

      if (!error) {
        setCurrentEvents(data);
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
      <FullCalendar
        height="75vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
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
        events={currentEvents.map((event) => ({
          id: event.id,
          title: event.diet_schedules.time
            ? `${event.diet_schedules.name} - ${event.diet_schedules.time}`
            : `${event.diet_schedules.name} - ${event.diet_schedules.sets} sets x ${event.diet_schedules.reps} repetitions`,
          date: event.diet_schedules.dte,
        }))}
      />
    </div>
  );
};

export default Calendar;
