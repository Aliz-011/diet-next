import Heading from '@/components/heading';

import { getExercise, getFoods, getFoodsByName } from '@/actions/get-api-data';
import { SearchClient } from './_components/client';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    minFat: string;
    minCarbs: string;
    minProtein: string;
    minCalories: string;
    minSugar: string;
    maxFat: string | undefined;
    maxCarbs: string | undefined;
    maxProtein: string | undefined;
    maxCalories: string | undefined;
    maxSugar: string | undefined;
    name: string | undefined;
    foodName: string | undefined;
  };
}) => {
  const { name: exerciseName, foodName, ...rest } = searchParams;

  let bodyContent = null;

  if (!!foodName) {
    // const foods = await getFoods({ ...rest });
    const foods = await getFoodsByName(foodName);
    bodyContent = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <SearchClient foods={foods.results} />
      </div>
    );
  }

  if (exerciseName !== undefined) {
    const exercises = await getExercise(exerciseName);
    bodyContent = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <SearchClient exercises={exercises} />
      </div>
    );
  }

  return (
    <main className="space-y-6 px-4 xl:px-0">
      <Heading title="Results" subtitle="The results we got for you" />
      {bodyContent}
    </main>
  );
};

export default SearchPage;
