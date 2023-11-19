import Ad from './_components/ad';
import SectionTabs from './_components/section-tabs';
import { SchedulesColumn, columns } from './_components/columns';

import Heading from '@/components/heading';
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
import CaledarSchedule from '@/components/calendar-schedule';
import { DataTable } from '@/components/table/data-table';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const SetupPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('schedules')
    .select('id, diet_type,diet_schedules,status,created_at')
    .eq('user_id', session?.user.id)
    .eq('diet_type', 'exercise');

  const formattedSchedules: SchedulesColumn[] = data?.map((item) => ({
    id: item.id,
    diet_type: item.diet_type,
    diet_schedules: item.diet_schedules.name,
    status: item.status,
    created_at: new Date(item.created_at).toLocaleString('us-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  }))!;

  return (
    <div className="space-y-4">
      <Ad />
      <CaledarSchedule />
      <SectionTabs />
      <HorizontalScrollbar />

      <div className="mx-auto pt-10">
        <Heading
          title="History"
          subtitle="Your previous completed activity will shown here"
        />
        {data?.length! > 0 && (
          <DataTable
            data={formattedSchedules}
            columns={columns}
            searchKey="diet_schedules"
          />
        )}
      </div>
    </div>
  );
};

export default SetupPage;
