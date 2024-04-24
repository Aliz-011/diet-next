'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useUser } from '@/hooks/use-user';
import { createClient } from '@/utils/supabase/client';

const formSchema = z.object({
  weight: z.coerce.number().gt(30),
  activityLevel: z.string({
    required_error: 'Please select an intensity of your daily activity.',
  }),
});

const AccountWeightForm = () => {
  const { user } = useUser();
  const supabase = createClient();
  const router = useRouter();
  const params = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [weight, setWeight] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchWeight = async () => {
      const { data: antropometri, error } = await supabase
        .from('antropemetri')
        .select('created_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!error) {
        setWeight(antropometri.created_at);
      }
    };

    fetchWeight();
  }, [setWeight, supabase]);

  useEffect(() => {
    if (params.get('error') === 'requiredFields') {
      toast.error('Isi berat badan hari ini terlebih dahulu!');
    }
  }, [params]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.from('antropemetri').insert({
        weight: values.weight,
        intensity: values.activityLevel,
        user_id: user?.id,
      });

      if (error) throw error;

      toast.success('Success! Sekarang kamu bisa memulai diet hari ini!');
      router.refresh();
      router.push('/');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  const disabled = useMemo(() => {
    return new Date(weight).getDate() === new Date().getDate();
  }, [weight]);

  return (
    <section className="my-10 border p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-col md:flex-row gap-x-8 w-full">
            <div className="w-full md:w-1/2">
              <div>
                <div className="text-base font-semibold leading-7 dark:text-gray-200">
                  Weight
                </div>
                <p className="text-sm leading-6">
                  Update your weight every day to keep track your progress.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="font-semibold">Intensity level</div>
                <ul>
                  <li className="font-medium text-sm leading-6">
                    Very light:{' '}
                    <span className="font-normal">Little or no exercise</span>
                  </li>
                  <li className="font-medium text-sm leading-6">
                    Light:{' '}
                    <span className="font-normal">Exercise 1-3 times/week</span>
                  </li>
                  <li className="font-medium text-sm leading-6">
                    Active:{' '}
                    <span className="font-normal">
                      Daily exercise or 3-4 times/week
                    </span>
                  </li>
                  <li className="font-medium text-sm leading-6">
                    Heavy:{' '}
                    <span className="font-normal">
                      Intense daily exercise or physical job
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8 md:mt-0 w-full md:w-1/2 pr-0 md:pr-48">
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g 52"
                          disabled={isLoading || disabled}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intensity</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger disabled={isLoading || disabled}>
                            <SelectValue placeholder="Select intensity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="xlight">Very Light</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="heavy">Heavy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Intensity of your daily activity
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" flex items-center justify-end gap-x-6 col-span-full">
                <Button type="submit" disabled={isLoading || disabled}>
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AccountWeightForm;
