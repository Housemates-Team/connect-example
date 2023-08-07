import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DynamicImage } from '@/types';

type Props = {
  room_name: string;
  images: DynamicImage[];
};

const BannerImages = ({ room_name, images }: Props) => {
  return (
    <div className="relative items-center flex">
      <div className="w-1/2 h-[25rem] cursor-pointer relative">
        <div className="w-full h-full relative">
          <LazyLoadImage
            src={images[0].large}
            className="object-cover h-full w-full rounded-md"
            effect="opacity"
            height="100%"
            width="100%"
            alt={images[0]?.alt}
          />
        </div>
      </div>
      <div className="w-1/2 h-[25rem] grid grid-cols-2 grid-rows-2 gap-4 ml-4 min-w-[25rem]">
        {images.length > 1 && (
          <div>
            <LazyLoadImage
              src={images[1].small}
              className="object-cover h-full w-full rounded-md"
              effect="opacity"
              height="100%"
              width="100%"
              alt={images[1]?.alt}
            />
          </div>
        )}
        {images.length > 2 && (
          <div>
            <LazyLoadImage
              src={images[2].small}
              className="object-cover h-full w-full rounded-md"
              effect="opacity"
              height="100%"
              width="100%"
              alt={images[1]?.alt}
            />
          </div>
        )}
        {images.length > 3 && (
          <div>
            <LazyLoadImage
              src={images[3].small}
              className="object-cover h-full w-full rounded-md"
              effect="opacity"
              height="100%"
              width="100%"
              alt={images[1]?.alt}
            />
          </div>
        )}
        {images.length > 4 && (
          <div>
            <LazyLoadImage
              src={images[4].small}
              className="object-cover h-full w-full rounded-md"
              effect="opacity"
              height="100%"
              width="100%"
              alt={images[1]?.alt}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerImages;
