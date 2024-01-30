'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';

import useDietScheduleModal from '@/hooks/use-diet-schedule-modal';
import { useUser } from '@/hooks/use-user';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const formSchema = z.object({
  dte: z.date({
    required_error: 'A date is required.',
  }),
  time: z.enum(['breakfast', 'lunch', 'dinner'], {
    required_error: 'You need to select a time for meal.',
  }),
});

const DietScheduleModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose, data } = useDietScheduleModal();
  const { user } = useUser();
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.from('schedules').insert({
        user_id: user?.id,
        diet_type: 'diet',
        diet_schedules: {
          id: data?.id,
          name: data?.title,
          calories: data?.nutrition.nutrients[0].amount,
          ...values,
        },
      });
      if (error) throw error;

      toast.success('Success add to your plan');
      router.refresh();
      form.reset();
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
      title="Diet"
      description="Add your desire food menu to your plan"
      isOpen={isOpen}
      onChange={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled value={data?.title} />
              </FormControl>

              <FormMessage />
            </FormItem>
          </div>

          <div className="flex items-center gap-x-4 justify-between">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the time for meal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dte"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date to eat</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Date you want to eat.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type="submit">
            Add To Plan
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default DietScheduleModal;
