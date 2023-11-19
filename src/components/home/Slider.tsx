"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";

export default function Slider({ images }: { images: string[] } = { images: [] }) {
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
            src={image}
            alt={`${image}_${index}`}
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
