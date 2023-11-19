'use client';

import { useState } from 'react';
import { Copy, MoreHorizontal, Trash, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { SchedulesColumn } from './columns';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/hooks/use-user';
import { useConfettiStore } from '@/hooks/use-confetti-store';

interface CellActionProps {
  data: SchedulesColumn;
}

const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUser();
  const confetti = useConfettiStore();

  const [open, setOpen] = useState(false);

  const update = async () => {
    try {
      const { error } = await supabase
        .from('schedules')
        .update({
          status: 'done',
        })
        .eq('user_id', user?.id)
        .eq('id', data.id);

      if (error) throw error;

      confetti.onOpen();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Order ID copied to clipboard.');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id as string)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={update} disabled={data.status === 'done'}>
            <CheckCircle className="mr-2 h-4 w-4" /> Mark as done
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
