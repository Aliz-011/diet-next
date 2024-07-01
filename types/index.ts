export interface UserDetails {
  id: string;
  full_name?: string;
  sex?: string;
  age?: number;
  height?: number;
  avatar_url?: string;
}

export type ExerciseSchedule = {
  id: string;
  user_id: string;
  diet_type: string;
  status: string;
  diet_schedules: {
    name: string;
    reps: number;
    sets: number;
    target: string;
    bodyPart: string;
    equipment: string;
  };
  created_at: string;
};

export type Exercises = {
  id: string;
  name: string;
  gifUrl: string;
  target: string;
  bodyPart: string;
  equipment: string;
  secondaryMuscles: [];
  instructions: [];
};

export type Food = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  license?: string | undefined;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: Nutrition;
  summary: string;
  cuisines: any[];
  dishTypes: string[];
  diets: string[];
  occasions: any[];
  analyzedInstructions: AnalyzedInstruction[];
  spoonacularSourceUrl: string;
};

export type AnalyzedInstruction = {
  name: string;
  steps: Step[];
};

export type Step = {
  number: number;
  step: string;
  ingredients: Ent[];
  equipment: Ent[];
  length?: Length;
};

export type Ent = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type Length = {
  number: number;
  unit: string;
};

export type Nutrition = {
  nutrients: Flavonoid[];
  properties: Flavonoid[];
  flavonoids: Flavonoid[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
};

export type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};

export type Flavonoid = {
  name: string;
  amount: number;
  unit: 'g' | 'IU' | 'kcal' | 'mg' | '%' | '' | 'µg';
  percentOfDailyNeeds?: number;
};

export enum Unit {
  Empty = '',
  G = 'g',
  Iu = 'IU',
  Kcal = 'kcal',
  Mg = 'mg',
  unit = '%',
}

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Flavonoid[];
};

export type WeightPerServing = {
  amount: number;
  unit: 'g' | 'mg';
};
