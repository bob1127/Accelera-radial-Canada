"use client";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function EthnocareScrollAnimation() {
  const containerRef = useRef(null);
  const countRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const stickySection = containerRef.current.querySelector("#steps");
    const cards = cardsRef.current;
    const countContainer = countRef.current;
    const stickyHeight = window.innerHeight * 7;
    const totalCards = cards.length;

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        positionCards(self.progress);
      },
    });

    const getRadius = () =>
      window.innerWidth < 900
        ? window.innerWidth * 7.5
        : window.innerWidth * 2.5;

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    function positionCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 7.5;
      const adjustedProgress = (progress * totalTravel - 1) * 0.75;

      cards.forEach((card, i) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        });
      });
    }

    positionCards(0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = cards.findIndex((c) => c === entry.target);
            const targetY = 150 - cardIndex * 150;
            gsap.to(countContainer, {
              y: targetY,
              duration: 0.3,
              ease: "power1.out",
              overwrite: true,
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    cards.forEach((card) => observer.observe(card));

    window.addEventListener("resize", () => positionCards(0));
  }, []);

  const cardData = [
    {
      img: "/images/index/carousel/NBABoqBEKSGLYPfiCGla.webp",
      title: "IOTA-ST68",
      subtitle: "THE MODERN SUV TIRE",
      text: "Iota ST68 – A durable SUV tire with sharp handling, strong wet grip, and all-season reliability.",
    },
    {
      img: "/images/index/carousel/kpLokax3l8cmCQeaHnkl.webp",
      title: "BADAK X-TREME",
      subtitle: "THE Off-road SUVs TIRE",
      text: "The Accelera Badak X-Treme is a rugged mud-terrain tire built for extreme off-road grip and durability.",
    },
    {
      img: "/images/index/carousel/OgADK7EjF5IG71sFPSIs.webp",
      title: "BADAK X-TREME",
      subtitle: "THE Off-road SUVs TIRE",
      text: "The Accelera Badak X-Treme is a rugged mud-terrain tire built for extreme off-road grip and durability.",
    },
    {
      img: "/images/index/carousel/NBABoqBEKSGLYPfiCGla.webp",
      title: "IOTA-ST68",
      subtitle: "THE MODERN SUV TIRE",
      text: "Iota ST68 – A durable SUV tire with sharp handling, strong wet grip, and all-season reliability.",
    },
    {
      img: "/images/index/carousel/kpLokax3l8cmCQeaHnkl.webp",
      title: "BADAK X-TREME",
      subtitle: "THE Off-road SUVs TIRE",
      text: "The Accelera Badak X-Treme is a rugged mud-terrain tire built for extreme off-road grip and durability.",
    },
    {
      img: "/images/index/carousel/OgADK7EjF5IG71sFPSIs.webp",
      title: "BADAK X-TREME",
      subtitle: "THE Off-road SUVs TIRE",
      text: "The Accelera Badak X-Treme is a rugged mud-terrain tire built for extreme off-road grip and durability.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-screen h-[900vh] bg-black text-white font-sans overflow-hidden"
    >
      <section
        id="steps"
        className="relative w-screen h-screen overflow-hidden"
      >
        <div className="absolute top-10 left-6 flex flex-col">
          <div className="w-[120px] h-[30px] md:h-[150px] overflow-hidden">
            <h1 className="text-xl md:text-[150px] uppercase font-black leading-none">
              steps
            </h1>
          </div>
          <div className="w-[120px] h-[30px] md:h-[150px] overflow-hidden relative">
            <div
              ref={countRef}
              className="flex flex-col transition-transform duration-300 ease-out will-change-transform"
            >
              {["01", "02", "03", "04", "05"].map((num, idx) => (
                <h1
                  key={idx}
                  className="text-xl md:text-[150px] font-black leading-none"
                >
                  {num}
                </h1>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[150vw] h-[600px] will-change-transform">
          {cardData.map((card, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute w-[320px] h-[550px] left-1/2 top-1/2 -ml-[250px] flex flex-col gap-4"
            >
              <div className="flex-1  rounded-lg overflow-hidden">
                <img
                  src={card.img}
                  className="object-cover w-full h-full"
                  alt="card"
                />
              </div>
              <div className="w-full h-[60px]">
                <h3 className="text-[#e71c0e] text-[22px]  font-extrabold leading-tight">
                  {card.title}
                </h3>
                <p className="text-white text-sm font-medium leading-tight">
                  {card.subtitle}
                </p>
                <span className="text-white text-[14px] font-mormal leading-tight">
                  {card.text}
                </span>
              </div>
            </div>
          ))}

          <div className="absolute w-[500px] h-[550px] left-1/2 top-1/2 -ml-[250px] flex items-center justify-center opacity-0">
            <p>EMPTY</p>
          </div>
          <div className="absolute w-[500px] h-[550px] left-1/2 top-1/2 -ml-[250px] flex items-center justify-center opacity-0">
            <p>EMPTY</p>
          </div>
        </div>
      </section>

      <section className="relative w-full h-screen overflow-hidden">
        {/* 影片 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/file.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 漸層遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#364549] opacity-80 pointer-events-none"></div>

        {/* 內容（可選） */}
        <div className="relative flex-col  z-10 flex justify-center items-center h-full text-white">
          <h2 className="text-4xl md:text-6xl font-bold">
            Stay Fast. Stay Firm
          </h2>
          <p className="text-[15px] mt-6 text-white">
            Speed needs control — we deliver both
          </p>
        </div>
      </section>
    </div>
  );
}
