"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { IMasterData } from ".";

export default function Slider({ images }: { images: IMasterData[] } = { images: [] }) {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination]}
      loop
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="overflow-hidden relative">
          <Image
            src={image.data}
            alt={image.id}
            priority
            quality={100}
            width="0"
            height="0"
            sizes="100vw"
            className="slider__image"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
