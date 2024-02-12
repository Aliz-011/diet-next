interface DataProps {
  id: any;
  diet_type: any;
  diet_schedules: any;
  status: any;
  created_at: any;
}

export const List = ({ data }: { data: DataProps[] | null }) => {
  if (data) {
    console.log(data);
  }
  return <div>List</div>;
};
