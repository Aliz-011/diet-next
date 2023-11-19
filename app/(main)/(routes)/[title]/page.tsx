import Heading from '@/components/heading';
import SearchClient from './_components/client';

import { Exercises } from '@/types';
import { exerciseOptions } from '@/utils/rapidapi';

async function getData(title: string): Promise<Exercises[]> {
  const response = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${title}?limit=1000`,
    {
      ...exerciseOptions,

      cache: 'force-cache',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

const SearchPage = async ({ params }: { params: { title: string } }) => {
  const exercises = await getData(params.title);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      <div className="col-span-full">
        <Heading
          title={`Muscle group: ${params.title}(${exercises.length})`}
          subtitle={`List of exercises currently available.`}
        />
      </div>
      <SearchClient data={exercises} />
    </div>
  );
};

export default SearchPage;
