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
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value}${param}`} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};
