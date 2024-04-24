'use client';

import Image from 'next/image';

import { useUser } from '@/hooks/use-user';
import useAuthModal from '@/hooks/use-auth-modal';
import useScheduleModal from '@/hooks/use-exercise-schedule-modal';

import { Button } from '@/components/ui/button';
import { Badge } from './ui/badge';
import { Exercises } from '@/types';

const ExerciseCard = ({ data }: { data: Exercises }) => {
  const { user } = useUser();
  const { onOpen } = useAuthModal();
  const scheduleModal = useScheduleModal();

  const addToSchedule = async () => {
    if (!user) {
      onOpen();
      return;
    }

    scheduleModal.onOpen(data);
  };

  return (
    <div className="col-span-1 group cursor-pointer rounded-xl p-3">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.gifUrl}
            alt="Listing"
            sizes="20"
          />
        </div>

        <div className="font-semibold text-lg line-clamp-1">{data.name}</div>
        <div className="font-light text-neutral-500 capitalize">
          {data.bodyPart}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="text-sm capitalize flex items-center gap-x-1 font-medium">
            Target: <Badge variant="secondary">{data.target}</Badge>
          </div>
        </div>

        <Button onClick={addToSchedule} className="mt-2">
          Add to schedule
        </Button>
      </div>
    </div>
  );
};

export default ExerciseCard;
