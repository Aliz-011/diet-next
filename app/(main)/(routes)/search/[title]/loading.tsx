import SkeletonCard from '@/components/skeleton-card';

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {'abcdefghij'.split('').map((item) => (
        <SkeletonCard key={item} />
      ))}
    </div>
  );
};

export default Loading;
