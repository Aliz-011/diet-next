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
        <XAxis dataKey="date" hide />
        <YAxis tickFormatter={(value) => `${value}${param}`} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="calories"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="burned" stroke="#82ca9d" />
        <Legend />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

function CustomTooltip({ payload, label, active }: any) {
  if (active) {
    return (
      <div className="border p-3 bg-gray-700/5">
        <p className="font-medium">Date: {label}</p>
        {payload && payload.length && (
          <>
            <p className="text-muted-foreground">
              Consumed: {payload[0].value}
            </p>
            <p className="text-muted-foreground">Burned: {payload[1].value}</p>
          </>
        )}
      </div>
    );
  }

  return null;
}
