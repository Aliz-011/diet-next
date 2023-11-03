'use client';

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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useUser } from '@/hooks/use-user';

const formSchema = z.object({
  weight: z.coerce.number().lt(30),
});

const AccountWeightForm = () => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
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
                Update your weight to keep track of your monthly weight goal!
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
                        <Input placeholder="e.g 52" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" flex items-center justify-end gap-x-6 col-span-full">
                <Button type="submit">Save changes</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AccountWeightForm;
