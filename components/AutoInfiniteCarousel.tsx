"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const images = [
  { src: "/images/MT01.webp", link: "/products/mt01" },
  { src: "/images/PHI-2.webp", link: "/products/phi-2" },
  { src: "/images/OMIKRON.webp", link: "/products/omikron" },
  { src: "/images/X-GRIPN.webp", link: "/product/x-grip-n" },
  { src: "/images/MT01.webp", link: "/products/mt01" },
  { src: "/images/PHI-2.webp", link: "/products/phi-2" },
  {
    src: "/images/4ac2b10ba5d72f873d99147345d9b5f5-2.png",
    link: "/products/custom-1",
  },
  { src: "/images/IOTA-STA68.png", link: "/product/iota-st-68-tire" },
  { src: "/images/ecoplush.png", link: "/products/ecoplush" },
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
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        className="w-full"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-md shadow-md"
            >
              <Link href={item.link}>
                <Image
                  src={item.src}
                  alt={`slide-${index}`}
                  width={800}
                  height={800}
                  className="w-full max-w-full h-auto object-cover"
                />
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
