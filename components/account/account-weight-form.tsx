'use client';

import { useRouter } from 'next/navigation';
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.from('antropemetri').insert({
        weight: values.weight,
        intensity: values.activityLevel,
        user_id: user?.id,
      });

      if (error) throw error;

      toast.success('Success updating your weight!');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  const disabled = useMemo(() => {
    return new Date(weight).getMonth() === new Date().getMonth();
  }, [weight]);

  return (
    <section className="my-10 border p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-col md:flex-row gap-x-8 w-full">
            <div className="w-full md:w-1/2">
              <h2 className="text-base font-semibold leading-7 dark:text-gray-200">
                Weight
              </h2>
              <p className="mt-1 text-sm leading-6 dark:text-gray-400">
                Update your weight once a month to keep track of your weight
                goal!
              </p>
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
