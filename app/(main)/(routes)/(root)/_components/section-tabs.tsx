import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FoodCard from '@/components/food-card';
import ExerciseCard from '@/components/exercise-card';
import Heading from '@/components/heading';

import { Exercises, Food } from '@/types';
import { exerciseOptions } from '@/utils/rapidapi';
import { results } from '@/utils/data';

async function getExerciseData(): Promise<Exercises[]> {
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
  const exercises = await getExerciseData();

  return (
    <section className="space-y-2">
      <div id="section-tabs" className="px-4">
        <Heading
          title="Foods & Exercises"
          subtitle="Find your suitable food or exercises and add to your plan."
        />
      </div>
      <div className="mb-10">
        <Tabs defaultValue="foods">
          <TabsList className="mb-2 mx-4">
            <TabsTrigger value="foods">Foods</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>

          <TabsContent
            value="foods"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
          >
            {results.map((item: Food) => (
              <FoodCard key={item.id} data={item} />
            ))}
          </TabsContent>
          <TabsContent
            value="exercises"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
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
