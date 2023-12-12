import Heading from '@/components/heading';
import Calendar from './_components/calendar';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const SchedulePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    </div>
  );
};

export default SchedulePage;
