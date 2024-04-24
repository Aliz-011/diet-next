import { cookies } from 'next/headers';

import Heading from '@/components/heading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RecentActivity } from './_components/recent-activity';
import { History } from './_components/history';
import { WeightOverview } from './_components/weight-overview';

import { createClient } from '@/utils/supabase/server';

const ActivityPage = async () => {
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

  const { data: schedules } = await supabase
    .from('schedules')
    .select('id, diet_type, diet_schedules, status, created_at')
    .eq('status', 'done')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="px-4 xl:px-0">
      <Heading title="Activity" subtitle="Your recent activity" />
      <div className="grid gap-y-8 gap-x-4 grid-cols-2 lg:grid-cols-7 my-5">
        <WeightOverview />

        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Here you can see the recent activities of your exercise and meals(
              {schedules?.length}).
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!schedules?.length && (
              <p className="text-sm text-muted-foreground font-semibold text-center">
                No Activity Found
              </p>
            )}
            {schedules?.length! > 0 && <RecentActivity data={schedules} />}
          </CardContent>
        </Card>
        <History />
      </div>
    </main>
  );
};

export default ActivityPage;
