'use client';

import Image from 'next/image';
import useSWR from 'swr';
import fetchImages from '@/lib/fetchImages';

const Images = () => {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR('images', fetchImages, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      <div>
        {images?.map((image: string) => (
          <Image src={image} alt='Image' width={100} height={100} />
        ))}
      </div>
    </div>
  );
};

export default Images;
