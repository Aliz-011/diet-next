'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';

import Modal from './modal';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { createClient } from '@/utils/supabase/client';
import useCustomDiet from '@/hooks/use-custom-diet';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  dte: z.coerce.date({
    required_error: 'A date is required.',
  }),
  title: z.string().min(1),
  calories: z.coerce.number().gt(1),
  time: z.enum(['breakfast', 'lunch', 'dinner'], {
    required_error: 'You need to select a time for meal.',
  }),
});

const CustomDietModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useCustomDiet();
  const { user } = useUser();
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      calories: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.from('schedules').insert({
        user_id: user?.id,
        diet_type: 'diet',
        diet_schedules: {
          id: nanoid(),
          name: values.title,
          calories: values.calories,
          burned: 0,
          imgUrl: '',
          time: values.time,
          dte: new Date(values.dte.toUTCString()),
        },
      });
      if (error) throw error;

      toast.success('Success! You can check your schedules');
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

  const currentDate = new Date();
  const yesterday = new Date(
    currentDate.setDate(currentDate.getDate() - 1)
  ).toISOString();

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
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama makanan</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Rendang" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              name="calories"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kalori</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="e.g. 700" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row items-center gap-x-4 justify-between">
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
            Add To Plan
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default CustomDietModal;
