import { cookies } from 'next/headers';

import Heading from '@/components/heading';
import Calendar from './_components/calendar';

import { createClient } from '@/utils/supabase/server';
import { List } from './_components/list';

const SchedulePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('schedules')
    .select('id, diet_type,diet_schedules,status,created_at')
    .eq('user_id', user?.id)
    .eq('status', 'on my way')
    .order('created_at', { ascending: false });

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center p-24">
        <span>You are not logged in.</span>
      </main>
    );
  }

  return (
    <main className="px-4 xl:px-0">
      <div
        className="p-4 mb-4 text-sm text-blue-800 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span className="font-medium">
          Klik nama makanan atau exercise di dalam kalendar kalau telah
          menjalankannya.
        </span>{' '}
      </div>
      <Heading title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Calendar />
      <List data={data} />
    </main>
  );
};

export default SchedulePage;
