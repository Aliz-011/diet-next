import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FoodCard from '@/components/food-card';
import ExerciseCard from '@/components/exercise-card';
import Heading from '@/components/heading';

import { results } from '@/utils/data';

import { Exercises } from '@/types';
import { exerciseOptions } from '@/utils/rapidapi';

async function getData(): Promise<Exercises[]> {
  const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
    ...exerciseOptions,
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

const SectionTabs = async () => {
  const exercises = await getData();

  return (
    <section className="space-y-2">
      <Heading
        title="Foods & Exercises"
        subtitle="Find your suitable food or exercises and add to your plan."
      />
      <div className="mb-10">
        <Tabs defaultValue="foods">
          <TabsList className="mb-2">
            <TabsTrigger value="foods">Foods</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>

          <TabsContent
            value="foods"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
          >
            {results.map((item) => (
              <FoodCard key={item.id} data={item} />
            ))}
          </TabsContent>
          <TabsContent
            value="exercises"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
          >
            {exercises.map((exercise, i) => (
              <ExerciseCard data={exercise} key={i} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SectionTabs;