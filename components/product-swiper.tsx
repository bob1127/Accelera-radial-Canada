"use client";

import { motion } from "framer-motion";
import "swiper/css";
import { Autoplay } from "swiper/modules"; // ✅ 引入模組
import { Swiper, SwiperSlide } from "swiper/react";

type ProductSwiperProps = {
  images: { src: string; alt?: string }[];
};

export default function ProductSwiper({ images }: ProductSwiperProps) {
  return (
    <Swiper
      modules={[Autoplay]} // ✅ 註冊模組
      spaceBetween={10}
      slidesPerView={1}
      loop
      speed={600}
      autoplay={{
        delay: 3000, // 每張停留 3 秒
        disableOnInteraction: false, // 滑動後仍持續自動播放
      }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-lg"
          >
            <img
              src={img.src}
              alt={img.alt || `Image ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
