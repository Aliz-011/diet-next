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

import { createClient } from '@/utils/supabase/server';
import { getCaloriesGraph } from '@/actions/get-graph-activity';
import { History } from './_components/history';
import { WeightOverview } from './_components/weight-overview';

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

  const caloriesGraph = await getCaloriesGraph();

  return (
    <div>
      <Heading title="Activity" subtitle="Your recent activity" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 my-5">
        <WeightOverview />

        <Card className="col-span-full md:col-span-3">
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
        <History calories={caloriesGraph} />
      </div>
    </div>
  );
};

export default ActivityPage;
