import Ad from './_components/ad';
import SectionTabs from './_components/section-tabs';
import { Payment, columns } from './_components/columns';
import { DataTable } from './_components/data-table';

import Heading from '@/components/heading';
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
import CaledarSchedule from '@/components/calendar-schedule';

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
    },
    // ...
  ];
}

const SetupPage = async () => {
  const data = await getData();

  return (
    <div className="space-y-4">
      <Ad />
      <CaledarSchedule />
      <SectionTabs />
      <HorizontalScrollbar />

      <div className="mx-auto pt-10">
        <Heading
          title="History"
          subtitle="Your previous completed activity will shown here"
        />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default SetupPage;
