"use client";

import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Slide {
  image: string;
  title: string;
}

interface HeroSwiperSliderProps {
  slides: Slide[];
}

export default function HeroSwiperSlider({ slides }: HeroSwiperSliderProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation
    ) {
      // @ts-ignore
      swiperInstance.params.navigation.prevEl = prevRef.current;
      // @ts-ignore
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="relative w-full h-[450px] md:h-[650px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        speed={800}
        onSwiper={setSwiperInstance}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "inline-block w-8 h-1 mx-1 bg-gray-300 rounded transition-all duration-300",
          bulletActiveClass: "bg-white",
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[450px] md:h-[650px] flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 自訂左右箭頭 */}
      <button
        ref={prevRef}
        className="absolute top-1/2 hidden sm:flex items-center justify-center w-10 h-10 left-8 z-10 -translate-y-1/2 bg-white/70 hover:bg-white rounded-xl shadow transition duration-500"
      >
        ←
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 hidden sm:flex items-center justify-center w-10 h-10 right-8 z-10 -translate-y-1/2 bg-white/70 hover:bg-white rounded-xl shadow transition duration-500"
      >
        →
      </button>

      {/* 自訂 pagination */}
      <div className="custom-pagination absolute left-0 right-0 bottom-6 flex justify-center z-10" />
    </div>
  );
}
