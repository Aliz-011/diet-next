import { Exercises, Food } from '@/types';
import { exerciseOptions } from '@/utils/rapidapi';

export const getExercise = async (name: string): Promise<Exercises[]> => {
  const response = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/name/${name}?limit=10000`,
    {
      ...exerciseOptions,
      cache: 'force-cache',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getFoods = async ({
  minFat,
  minCarbs,
  minProtein,
  minCalories,
  minSugar,
  maxCalories,
  maxCarbs,
  maxFat,
  maxProtein,
  maxSugar,
}: {
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
}): Promise<{ results: Food[] }> => {
  const apiKey1 = '78f8ff209181490091bfe386fd7ecdcf';
  const apiKey2 = 'fcc15fe6c0cc417e9950f4efdef64adc';
  const apiKey3 = '1e308c7f24d447df8d332a8a7eed3561';
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey2}&addRecipeNutrition=true&minFat=${minFat}&minCarbs=${minCarbs}&minProtein=${minProtein}&minCalories=${minCalories}&minSugar=${minSugar}` +
      `${maxFat ? `&maxFat=${maxFat}` : ''}` +
      `${maxSugar ? `&maxSugar=${maxSugar}` : ''}` +
      `${maxCalories ? `&maxCalories=${maxCalories}` : ''}` +
      `${maxProtein ? `&maxProtein=${maxProtein}` : ''}` +
      `${maxCarbs ? `&maxCarbs=${maxCarbs}` : ''}` +
      `&number=100`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    }
  );

  if (!response.ok || response.status !== 200) {
    throw new Error('Quota exceeded');
  }

  return response.json();
};
