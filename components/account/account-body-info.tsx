'use client';

import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { useUser } from '@/hooks/use-user';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const AccountBodyInfo = () => {
  const { userDetails, user } = useUser();
  const supabase = useSupabaseClient();

  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState<number | undefined>(0);
  const [height, setHeight] = useState<number | undefined>(userDetails?.height);

  useEffect(() => {
    const fetchWeight = async () => {
      const { data: antropometri, error } = await supabase
        .from('antropemetri')
        .select('weight')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!error) {
        setWeight(antropometri.weight);
      }
    };

    fetchWeight();
  }, [supabase]);

  const heightInMeter = height! / 100;

  const idealWeight =
    userDetails?.sex === 'Male'
      ? Math.round(height! - 100 - (height! - 100) * 0.1)
      : Math.round(height! - 100 - (height! - 100) * 0.15);

  const bmi = (weight! / (heightInMeter * heightInMeter)).toFixed(2);

  const bmr =
    userDetails?.sex === 'Male'
      ? 66.5 + 13.75 * weight! + 5.003 * height! - 6.75 * userDetails?.age!
      : 655.1 + 9.563 * weight! + 1.85 * height! - 4.676 * userDetails?.age!;

  const calorieNeeds =
    userDetails?.sex === 'Male'
      ? (bmr * 1.12).toFixed(2)
      : (bmr * 1.14).toFixed(2);

  return (
    <section className="my-10 border p-6 rounded-lg">
      <div>
        <h2 className="text-base font-semibold leading-7 dark:text-gray-200">
          Ideal Weight
        </h2>
        <p className="mt-1 text-sm leading-6 dark:text-gray-400">
          Is the average human weight for a person&apos;s age and gender, based
          on their height and current fitness level.
        </p>
      </div>

      {weight !== 0 ? (
        <div className="mt-4">
          <div className="flex gap-x-2 items-center w-full md:w-1/3">
            <h3 className="mt-1 text-sm font-medium leading-6 dark:text-gray-200 w-2/3">
              Your ideal weight:
            </h3>
            <Badge>{idealWeight} kg</Badge>
          </div>
          <div className="flex gap-x-2 items-center w-full md:w-1/3">
            <h3 className="mt-1 text-sm font-medium leading-6 dark:text-gray-200 w-2/3">
              Your BMI:
            </h3>
            <Badge>{bmi}</Badge>
          </div>
          <div className="flex gap-x-2 items-center w-full md:w-1/3">
            <h3 className="mt-1 text-sm font-medium leading-6 dark:text-gray-200 w-2/3">
              Calorie Needs (kcal/day):
            </h3>
            <Badge>{calorieNeeds}</Badge>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              Fill your data first and your requirements wil shown here
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountBodyInfo;
