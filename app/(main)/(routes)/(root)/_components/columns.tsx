'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import CellAction from './cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SchedulesColumn = {
  id: string | number;
  diet_type: string;
  diet_schedules: {};
  status: string;
  created_at: number | string;
};

export const columns: ColumnDef<SchedulesColumn>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
  },
  {
    accessorKey: 'diet_schedules',
    header: 'Name',
  },
  {
    accessorKey: 'diet_type',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Diet type" />;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
