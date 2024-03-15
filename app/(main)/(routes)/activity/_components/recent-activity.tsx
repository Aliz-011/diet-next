import { format } from 'date-fns';

import { ScrollArea } from '@/components/ui/scroll-area';

interface RecentActivityProps {
  id: string;
  diet_type: string;
  diet_schedules: Record<string, any>;
  status: string;
  created_at: string | number;
}

export function RecentActivity({
  data,
}: {
  data: RecentActivityProps[] | null;
}) {
  return (
    <ScrollArea className="h-96">
      <div className="p-4">
        <div className="space-y-8">
          {data &&
            data.map((item) => (
              <div className="flex justify-between gap-x-2" key={item.id}>
                <div className="flex flex-col space-y-1">
                  <p className="font-medium leading-none line-clamp-1 capitalize">
                    {item.diet_schedules.name}
                  </p>
                  <p className="text-sm font-medium capitalize">
                    {item.diet_type}
                    {item.diet_schedules.time ? (
                      <span className="text-muted-foreground lowercase">
                        {' '}
                        - {item.diet_schedules.time}
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="text-xs font-medium ml-auto">
                  {format(new Date(item.diet_schedules.dte), 'PP')}
                </div>
              </div>
            ))}
        </div>
      </div>
    </ScrollArea>
  );
}
