'use client';

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Separator } from './ui/separator';

interface OverviewProps {
  data: any[];
  param: string;
}

export const Overview: React.FC<OverviewProps> = ({ data, param }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="date" hide />
        <YAxis tickFormatter={(value) => `${value}${param}`} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="calories"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="burned" stroke="#E02424" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

function CustomTooltip({ payload, label, active }: any) {
  if (!payload) {
    return null;
  }

  if (active && payload) {
    console.log(payload);
    const date = payload[0].payload.date;
    const consumed = payload[0].value;
    const burned = payload[1].value;

    return (
      <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
        <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
          {date}
        </div>
        <Separator />

        <div className="p-2 px-3 space-y-1">
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-2">
              <div className="size-1.5 bg-indigo-500 rounded-full" />
              <p className="text-sm text-muted-foreground">Consumed</p>
            </div>
            <p className="text-sm text-right font-medium">
              {Number(consumed).toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-2">
              <div className="size-1.5 bg-rose-500 rounded-full" />
              <p className="text-sm text-muted-foreground">Burned</p>
            </div>
            <p className="text-sm text-right font-medium">
              {Number(burned).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
