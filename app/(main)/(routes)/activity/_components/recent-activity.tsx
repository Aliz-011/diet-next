import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
              <div className="flex items-center" key={item.id}>
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none capitalize">
                    {item.diet_schedules.name}
                  </p>
                  <p className="text-sm text-muted-foreground uppercase">
                    {item.diet_type}
                  </p>
                </div>
                <div className="text-sm ml-auto font-medium">
                  {new Date(item.created_at).toLocaleString('us-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </ScrollArea>
  );
}
