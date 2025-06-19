"use client";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function HomePage() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gradientRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div>
      {/* Hero 區塊 */}
      <div className="HeroImg relative w-full h-[60vh] md:h-[80vh] max-h-[900px]">
        <Image
          src="/images/contact/heroimg.png"
          alt="Hero Image"
          placeholder="empty"
          loading="lazy"
          fill
          priority={false}
          className="object-cover"
        />
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="txt flex flex-col justify-center items-center">
            <h2 className="text-white text-center text-[24px] font-extrabold">
              Drive Fearlessly. Handle Effortlessly.
            </h2>
            <h1 className="text-white text-center !leading-[68px] mt-5">
              CONTACT NOW
            </h1>
          </div>
          <div className="flex justify-center mt-4">
            <InteractiveHoverButton className="min-w-[140px] px-6 py-2 text-base md:text-lg">
              Hover Me
            </InteractiveHoverButton>
          </div>
        </div>
      </div>

      {/* Parallax Gradient 區塊 */}
      <div
        ref={gradientRef}
        className="overflow-hidden !rounded-tr-[50px] mt-[-100px] rounded-tl-2xl relative"
      >
        <BackgroundGradientAnimation>
          <motion.div
            style={{ y }}
            className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"
          >
            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
              Gradients X Animations
            </p>
          </motion.div>
        </BackgroundGradientAnimation>
      </div>
    </div>
  );
}
