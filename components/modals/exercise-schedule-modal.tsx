'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

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
  dte: z.coerce.date({
    required_error: 'A date is required.',
  }),
});

const ExerciseScheduleModal = () => {
  const { isOpen, onClose, data } = useExerciseScheduleModal();
  const { user } = useUser();
  const supabase = createClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [weight, setWeight] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reps: 1,
      sets: 1,
    },
  });

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
  }, [setWeight, user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const isUsingEquipment = data?.equipment !== 'body weight';
      const { error } = await supabase.from('schedules').insert({
        user_id: user?.id,
        diet_type: 'exercise',
        diet_schedules: {
          ...data,
          ...values,
          dte: new Date(values.dte.toUTCString()),
          calories: 0,
          burned: isUsingEquipment
            ? ((3.5 * 3.5 * weight) / 200) *
              (values.sets * values.reps * (2 + values.sets))
            : 0.32 * (values.sets * values.reps * 2 + values.sets),
        },
      });

      if (error) throw error;

      toast.success('Exercise ditambahkan ke jadwal!');
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
              <FormLabel>Exercise</FormLabel>
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
                  <FormDescription>Jumlah set untuk exercise</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reps"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Repetisi</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Reps e.g 15" {...field} />
                  </FormControl>
                  <FormDescription>Repetisi untuk setiap set</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="dte"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal untuk exercise</FormLabel>
                  <Popover>
                    <PopoverTrigger className="w-full" asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type="submit">
            Tambahkan ke jadwal
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default ExerciseScheduleModal;
