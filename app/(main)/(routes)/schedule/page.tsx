import Heading from '@/components/heading';
import Calendar from './_components/calendar';
import { cookies } from 'next/headers';
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
    <div>
      <Heading title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Calendar />
      {/* <List data={data} /> */}
    </div>
  );
};

export default SchedulePage;
