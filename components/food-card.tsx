'use client';

import Image from 'next/image';
import { MouseEventHandler, useEffect, useState } from 'react';
import { LuExpand } from 'react-icons/lu';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import usePreviewModal from '@/hooks/use-preview-modal';
import useFavorite from '@/hooks/use-favorite';
import { useUser } from '@/hooks/use-user';
import useAuthModal from '@/hooks/use-auth-modal';
import useDietScheduleModal from '@/hooks/use-diet-schedule-modal';

import { Food } from '@/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const FoodCard = ({ data }: { data: Food }) => {
  const previewModal = usePreviewModal();
  const { onOpen } = useAuthModal();
  const scheduleModal = useDietScheduleModal();

  const favorite = useFavorite();
  const { user } = useUser();

  const initialIsFavorite = useFavorite(
    (state) => state.isFavorite[data.id] || false
  );
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    // TODO: make a props to this component to accept data and it will pass to this function below
    previewModal.onOpen(data);
  };

  const addToFavorite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (user) {
      favorite.addItem(data);

      // Update the isFavorite status in useFavorite
      useFavorite.setState((state) => ({
        ...state,
        isFavorite: { ...state.isFavorite, [data.id]: true },
      }));
    } else {
      onOpen();
    }
  };

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
            src={data?.image}
            alt="Listing"
            sizes="20"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <button
                onClick={onPreview}
                className="rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
              >
                <LuExpand size={16} className="text-gray-600" />
              </button>

              <button
                onClick={addToFavorite}
                className="relative cursor-pointer rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition"
              >
                <AiOutlineHeart
                  size={20}
                  className={cn(
                    isFavorite
                      ? 'text-rose-500 absolute'
                      : 'text-gray-400 absolute'
                  )}
                />
                <AiFillHeart
                  size={18}
                  className={cn(
                    isFavorite ? 'text-rose-500' : 'fill-neutral-500/70'
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="font-semibold text-lg line-clamp-1">{data?.title}</div>
        <div className="font-light text-neutral-500">
          {data?.servings} {data?.servings > 1 ? 'servings' : 'serving'}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${data?.pricePerServing}</div>
        </div>

        <Button onClick={addToSchedule}>Add to Schedule</Button>
      </div>
    </div>
  );
};

export default FoodCard;
