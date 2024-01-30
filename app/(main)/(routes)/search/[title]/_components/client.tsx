'use client';

import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ExerciseCard from '@/components/exercise-card';
import { buttonVariants } from '@/components/ui/button';

import { Exercises } from '@/types';

const SearchClient = ({ data }: { data: Exercises[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentData = data?.slice(firstIndex, lastIndex);

  const paginate = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      {currentData &&
        currentData.map((exercise) => (
          <ExerciseCard key={exercise.id} data={exercise} />
        ))}
      <div className="col-span-full">
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(data.length / dataPerPage)}
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

export default SearchClient;
