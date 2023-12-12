import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex-row space-y-4 items-center">
        <Skeleton className="h-40 flex-grow rounded" />
      </div>
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-4 flex-grow mt-4" />
        <Skeleton className="h-4 flex-grow mt-4" />
      </div>
      <div>
        <Skeleton className="h-4 w-1/2 mt-4" />
      </div>
    </div>
  );
};

export default SkeletonCard;
