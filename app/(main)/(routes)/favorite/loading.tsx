import SkeletonCard from '@/components/skeleton-card';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-16">
        <div className="flex flex-col gap-y-4">
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <Skeleton className="h-4 w-10 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {'abcdefghij'.split('').map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    </>
  );
};

export default Loading;
