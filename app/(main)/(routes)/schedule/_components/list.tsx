import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface DataProps {
  id: string;
  diet_type: string;
  diet_schedules: Record<string, any>;
  status: string;
  created_at: Date | number;
}

export const List = ({ data }: { data: DataProps[] | null }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {data &&
          data.map((item) => (
            <div key={item.id} className="flex flex-col w-full">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl mb-1">
                {item.diet_type === 'diet' && (
                  <Image
                    fill
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    src={item.diet_schedules.imgUrl}
                    alt={item.diet_schedules.name}
                  />
                )}
                {item.diet_type === 'exercise' && (
                  <Image
                    fill
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    src={item.diet_schedules.gifUrl}
                    alt={item.diet_schedules.name}
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-lg line-clamp-1">
                  {item.diet_schedules.name}
                </div>

                {item.diet_type === 'exercise' && (
                  <>
                    <div className="font-light">
                      {item.diet_schedules.sets} set x{' '}
                      {item.diet_schedules.reps} repetition
                    </div>
                    <div className="font-light capitalize">
                      {item.diet_schedules.bodyPart}
                    </div>
                    <div className="font-medium">
                      Target:{' '}
                      <Badge variant="secondary">
                        {item.diet_schedules.target}
                      </Badge>
                    </div>
                  </>
                )}

                {item.diet_type === 'diet' && (
                  <>
                    <div className="font-light text-muted-foreground capitalize">
                      {item.diet_schedules.time} -{' '}
                      <span className="font-medium">
                        {item.diet_schedules.calories} cal
                      </span>
                    </div>
                    <div className="font-light">
                      For: {format(new Date(item.diet_schedules.dte), 'PP')}
                    </div>
                    <Link
                      href={item.diet_schedules.source}
                      target="_blank"
                      className="underline"
                    >
                      Recipe
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
