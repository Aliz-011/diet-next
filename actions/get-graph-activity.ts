import { cookies } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

interface GraphData {
  name: string;
  total: number;
}

export const getWeightGraph = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: antropometri } = await supabase
    .from('antropemetri')
    .select('id, weight, created_at')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false });

  const graphData: GraphData[] = [
    {
      name: 'Jan',
      total: 0,
    },
    {
      name: 'Feb',
      total: 0,
    },
    {
      name: 'Mar',
      total: 0,
    },
    {
      name: 'Apr',
      total: 0,
    },
    {
      name: 'May',
      total: 0,
    },
    {
      name: 'Jun',
      total: 0,
    },
    {
      name: 'Jul',
      total: 0,
    },
    {
      name: 'Aug',
      total: 0,
    },
    {
      name: 'Sep',
      total: 0,
    },
    {
      name: 'Oct',
      total: 0,
    },
    {
      name: 'Nov',
      total: 0,
    },
    {
      name: 'Dec',
      total: 0,
    },
  ];

  // Iterate over antropometri data and update graphData
  antropometri?.forEach((order) => {
    const month = new Date(order.created_at).getMonth(); // Get month (0-11)
    graphData[month].total += order.weight;
  });

  return graphData;
};

export const getCaloriesGraph = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('schedules')
    .select('id, diet_schedules, status, created_at')
    .eq('user_id', session?.user?.id)
    .eq('status', 'done')
    .eq('diet_type', 'diet')
    .order('created_at', { ascending: false });

  const graphData: GraphData[] = [
    {
      name: 'Jan',
      total: 0,
    },
    {
      name: 'Feb',
      total: 0,
    },
    {
      name: 'Mar',
      total: 0,
    },
    {
      name: 'Apr',
      total: 0,
    },
    {
      name: 'May',
      total: 0,
    },
    {
      name: 'Jun',
      total: 0,
    },
    {
      name: 'Jul',
      total: 0,
    },
    {
      name: 'Aug',
      total: 0,
    },
    {
      name: 'Sep',
      total: 0,
    },
    {
      name: 'Oct',
      total: 0,
    },
    {
      name: 'Nov',
      total: 0,
    },
    {
      name: 'Dec',
      total: 0,
    },
  ];

  data?.forEach((item) => {
    const month = new Date(item.created_at).getMonth();
    graphData[month].total += item.diet_schedules.calories;
  });

  return graphData;
};
