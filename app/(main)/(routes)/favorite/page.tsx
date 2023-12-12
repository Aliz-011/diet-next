'use client';

import { useEffect, useState } from 'react';

import FoodCard from '@/components/food-card';
import useAuthModal from '@/hooks/use-auth-modal';
import useFavorite from '@/hooks/use-favorite';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const FavoritePage = () => {
  const { items, removeAll } = useFavorite();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { onOpen } = useAuthModal();

  useEffect(() => {
    if (!user) {
      router.replace('/');
      onOpen();
    }
  }, [router, user]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      <div className="col-span-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Favorites</h1>
          <p className="font-medium text-gray-500 text-sm">
            This is where you can see all your favorite recipes.
          </p>
        </div>
        <Button type="button" onClick={removeAll}>
          Remove all
        </Button>
      </div>

      {isClient && items.map((item) => <FoodCard key={item.id} data={item} />)}
    </div>
  );
};

export default FavoritePage;
