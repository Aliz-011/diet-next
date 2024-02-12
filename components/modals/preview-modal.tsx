'use client';

import Image from 'next/image';
import Link from 'next/link';

import Modal from './modal';
import { Button } from '@/components/ui/button';

import usePreviewModal from '@/hooks/use-preview-modal';
import useFavorite from '@/hooks/use-favorite';
import { useUser } from '@/hooks/use-user';
import useAuthModal from '@/hooks/use-auth-modal';

const PreviewModal = () => {
  const previeModal = usePreviewModal();
  const { onOpen } = useAuthModal();
  const data = usePreviewModal((state) => state.data);
  const favorite = useFavorite();
  const { user } = useUser();

  const onAddToCart = () => {
    if (user) {
      favorite.addItem(data!);

      // Update the isFavorite status in useFavorite
      useFavorite.setState((state) => ({
        ...state,
        isFavorite: { ...state.isFavorite, [data!.id]: true },
      }));
    } else {
      onOpen();
    }
  };

  if (!data) {
    return null;
  }

  return (
    <Modal
      title="Preview"
      description=""
      isOpen={previeModal.isOpen}
      onChange={previeModal.onClose}
    >
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <div className="flex flex-col-reverse">
            <div className="aspect-square w-full">
              <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                <Image
                  src={data?.image}
                  alt={data?.title + data?.imageType}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-8 lg:col-span-7">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
              {data?.title}
            </h1>
            <div className="mt-3 flex items-end justify-between">
              <p className=" text-gray-500 font-medium">
                {data?.servings} {data?.servings > 1 ? 'servings' : 'serving'}
              </p>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <p className=" text-gray-500 font-medium">
                {data?.nutrition?.nutrients[0]?.amount!}
                <span className="text-sm font-light">kcal</span>
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <h3 className="font-semibold text-black">Diet types:</h3>
                <ul className="grid grid-cols-2 gap-y-1 gap-x-2 list-disc pl-4">
                  {data?.diets?.map((item) => (
                    <li key={item}>
                      <p className="capitalize">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <div>
            <div dangerouslySetInnerHTML={{ __html: data?.summary }} />
            <Link
              target="_blank"
              href={`${data.spoonacularSourceUrl}`}
              className="underline text-blue-500"
            >
              Source
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-x-3">
            <Button onClick={onAddToCart} className="flex items-center gap-x-2">
              Add To Favorite
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
