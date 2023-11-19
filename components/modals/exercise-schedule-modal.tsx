'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useUser } from '@/hooks/use-user';
import useExerciseScheduleModal from '@/hooks/use-exercise-schedule-modal';
import { createClient } from '@/utils/supabase/client';

import Modal from './modal';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  reps: z.coerce
    .number({
      required_error: 'Reps is required',
    })
    .positive()
    .gt(1, {
      message: 'Reps should be greater than 0.',
    }),
  sets: z.coerce
    .number({
      required_error: 'Set is required',
    })
    .positive()
    .gt(1, {
      message: 'Set should be greater than 0.',
    }),
});

const ExerciseScheduleModal = () => {
  const { isOpen, onClose, data } = useExerciseScheduleModal();
  const { user } = useUser();
  const supabase = createClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reps: 1,
      sets: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.from('schedules').insert({
        user_id: user?.id,
        diet_type: 'exercise',
        diet_schedules: {
          ...data,
          ...values,
        },
      });
      if (error) throw error;

      toast.success('Success add to your plan');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      onClose();
      form.reset();
    }
  }

  return (
    <Modal
      title="Schedule"
      description="Plan your diet and adjust the requirement"
      isOpen={isOpen}
      onChange={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled value={data?.name} />
              </FormControl>

              <FormMessage />
            </FormItem>
          </div>

          <div className="flex items-center gap-x-4 justify-between">
            <FormField
              control={form.control}
              name="sets"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Set</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Set e.g 3" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of set for this exercise
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reps"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Repetitions</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Reps e.g 15" {...field} />
                  </FormControl>
                  <FormDescription>Repetitions for each set</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            Add to plan
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default ExerciseScheduleModal;
