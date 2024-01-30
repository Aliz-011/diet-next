'use client';

import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import FoodCard from '@/components/food-card';
import ExerciseCard from '@/components/exercise-card';
import { buttonVariants } from '@/components/ui/button';

import { Exercises, Food } from '@/types';

export const SearchClient = ({
  exercises,
  foods,
}: {
  exercises?: Exercises[];
  foods?: Food[];
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  console.log(foods);

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentDataExercise = exercises?.slice(firstIndex, lastIndex);
  const currentDataFoods = foods?.slice(firstIndex, lastIndex);

  const paginate = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  let bodyContent = null;

  if (exercises) {
    bodyContent = (
      <>
        {currentDataExercise &&
          currentDataExercise.map((exercise) => (
            <ExerciseCard key={exercise.id} data={exercise as Exercises} />
          ))}
      </>
    );
  } else {
    bodyContent = (
      <>
        {currentDataFoods &&
          currentDataFoods.map((item) => (
            <FoodCard key={item.id} data={item as Food} />
          ))}
      </>
    );
  }

  return (
    <>
      {bodyContent}
      <div className="col-span-full">
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(
            exercises
              ? exercises.length / dataPerPage
              : foods?.length! / dataPerPage
          )}
          previousLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
          containerClassName={'flex items-center -mx-[6px] gap-x-2'}
          pageLinkClassName={
            'w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white'
          }
          previousLinkClassName={
            'w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white'
          }
          nextLinkClassName={
            'w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white'
          }
          activeLinkClassName={buttonVariants({ variant: 'default' })}
          breakClassName="px-[6px]"
        />
      </div>
    </>
  );
};
