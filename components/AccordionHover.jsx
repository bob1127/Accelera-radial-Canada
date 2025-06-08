"use client";

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const awards = [
  {
    name: "Independent of the year",
    type: "Nominee",
    project: "INNOVATE 2024",
    label: "Awwwards",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "LVXH - AMOT",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Open Field Audio",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "ArtisanCraft",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Disguised Edge",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "Silvia Santiago",
    label: "See Live",
  },
  {
    name: "Site of the day",
    type: "Awwwards",
    project: "2023 Showcase",
    label: "See Live",
  },
];

export default function AwardsHoverComponent() {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const activeAwardRef = useRef(null);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });

    const POSITIONS = { BOTTOM: 0, MIDDLE: -80, TOP: -160 };
    let ticking = false;

    const animatePreview = () => {
      const images = previewRef.current?.querySelectorAll("img") || [];
      images.forEach((img) => {
        gsap.to(img, {
          scale: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => img.remove(),
        });
      });
    };

    const updateAwards = () => {
      animatePreview();
      const awardsElements = listRef.current?.querySelectorAll(".award") || [];

      awardsElements.forEach((award) => {
        const rect = award.getBoundingClientRect();
        const over =
          lastMouse.current.x >= rect.left &&
          lastMouse.current.x <= rect.right &&
          lastMouse.current.y >= rect.top &&
          lastMouse.current.y <= rect.bottom;

        const wrapper = award.querySelector(".award-wrapper");
        if (over && activeAwardRef.current !== award) {
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: "power2.out",
          });
          activeAwardRef.current = award;
        } else if (!over && activeAwardRef.current === award) {
          const fromTop = lastMouse.current.y < rect.top + rect.height / 2;
          gsap.to(wrapper, {
            y: fromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
            duration: 0.4,
            ease: "power2.out",
          });
          activeAwardRef.current = null;
        }
      });
      ticking = false;
    };

    const handleMouseMove = (e) => {
      lastMouse.current = { x: e.clientX, y: e.clientY };
      if (!ticking) {
        requestAnimationFrame(updateAwards);
        ticking = true;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateAwards);
        ticking = true;
      }
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative bg-[#e3e3db] font-sans">
      <section className="flex justify-center items-center h-screen w-full px-4">
        <h1 className="uppercase text-[12vw] md:text-[72px] font-extrabold leading-[0.9] tracking-tight text-center">
          Intro
        </h1>
      </section>

      <section className="min-h-screen w-full px-4">
        <p className="text-lg md:text-xl font-bold uppercase p-5">
          Recognition and awards
        </p>
        <div ref={listRef} className="border-t border-black">
          {awards.map((award, i) => (
            <div key={i} className="award h-[8vh] md:h-[80px] overflow-hidden">
              <div className="award-wrapper relative h-[8vh] md:h-[240px] -translate-y-[40vh] md:-translate-y-[160px] will-change-transform">
                <div className="award-name flex justify-between items-center h-[8vh] md:h-[80px] px-4 border-b border-black bg-[#e3e3db] text-black cursor-pointer">
                  <h1 className="!text-[16px] md:text-2xl font-bold uppercase">
                    {award.name}
                  </h1>
                  <h1 className="!text-[16px] md:text-2xl font-bold uppercase">
                    {award.type}
                  </h1>
                </div>
                <div className="award-project flex justify-between items-center h-[8vh] md:h-[80px] px-4 border-b border-black bg-black text-[#e3e3db] cursor-pointer">
                  <h1 className="!text-[16px] md:text-2xl font-bold uppercase">
                    {award.project}
                  </h1>
                  <h1 className="!text-[16px] md:text-2xl font-bold uppercase">
                    {award.label}
                  </h1>
                </div>
                <div className="award-name flex justify-between items-center h-[8vh] md:h-[80px] px-4 border-b border-black bg-[#e3e3db] text-black cursor-pointer">
                  <h1 className="!text-[16px] md:text-2xl font-bold uppercase">
                    {award.name}
                  </h1>
                  <h1 className="!text-[16px] md:text-2xl font-bold uppercase">
                    {award.type}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center h-screen w-full px-4">
        <h1 className="uppercase text-[12vw] md:text-[72px] font-extrabold leading-[0.9] tracking-tight text-center">
          Outro
        </h1>
      </section>

      <div
        ref={previewRef}
        className="fixed bottom-4 right-4 w-[90vw] h-[40vh] md:w-[30%] md:h-[30%] z-50 pointer-events-none"
      ></div>
    </div>
  );
}
