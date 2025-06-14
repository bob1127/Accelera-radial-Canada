"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const images = [
  "/images/MT01.webp",
  "/images/PHI-2.webp",
  "/images/OMIKRON.webp",
  "/images/X-GRIPN.webp",
  "/images/MT01.webp",
  "/images/PHI-2.webp",
];

export default function SwiperMotionCarousel() {
  return (
    <section className="w-full px-4 py-8 bg-black overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          1024: { slidesPerView: 4 }, // 桌機顯示 4 張
          768: { slidesPerView: 2 }, // 平板顯示 2 張
          0: { slidesPerView: 1 }, // 手機顯示 1 張
        }}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-md shadow-md"
            >
              <Image
                src={src}
                alt={`slide-${index}`}
                width={800}
                height={800}
                className="w-full max-w-full h-auto object-cover"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
