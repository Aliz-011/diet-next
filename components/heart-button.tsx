'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartButton = () => {
  const hasFavorited = false;

  return (
    <button
      className="
        relative
        cursor-pointer
        rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition
      "
    >
      <AiOutlineHeart
        size={20}
        className="
          text-gray-600
          absolute
        "
      />
      <AiFillHeart
        size={18}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </button>
  );
};

export default HeartButton;
