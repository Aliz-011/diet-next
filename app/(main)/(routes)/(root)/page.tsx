import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import qs from 'query-string';

import Ad from './_components/ad';
import SectionTabs from './_components/section-tabs';
import { SchedulesColumn, columns } from './_components/columns';
import Heading from '@/components/heading';
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
import { DataTable } from '@/components/table/data-table';

import { createClient } from '@/utils/supabase/server';
import { getTodayIntakeCalories } from '@/actions/get-graph-activity';

const SetupPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('schedules')
    .select('id, diet_type,diet_schedules,status,created_at')
    .eq('user_id', session?.user.id);

  const { data: antropometri } = await supabase
    .from('antropemetri')
    .select('created_at')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (
    session?.user &&
    new Date(antropometri?.created_at).getDay() !== new Date().getDay()
  ) {
    const url = qs.stringifyUrl({
      url: '/account',
      query: {
        error: 'requiredFields',
      },
    });
    redirect(url);
  }

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
      <SectionTabs />
      <HorizontalScrollbar />

      <div className="mx-auto pt-10 px-4 xl:px-0">
        <div id="history">
          <Heading
            title="History"
            subtitle="Your completed activity will be shown here"
          />
        </div>

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
