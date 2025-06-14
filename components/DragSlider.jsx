// app/components/DraggableSlider.jsx
"use client";

import { useEffect, useRef } from "react";

const images = [
  "/images/01.jpg",
  "/images/02.jpg",
  "/images/06.jpg",
  "/images/04.jpg",
  "/images/07.jpg",
  "/images/08.jpg",
];

export default function DraggableSlider() {
  const sliderRef = useRef();
  const wrapperRef = useRef();
  const barRef = useRef();
  const itemRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
    const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

    const el = sliderRef.current;
    const wrap = wrapperRef.current;
    const items = itemRefs.current;
    const imgs = imgRefs.current;
    const bar = barRef.current;

    let progress = 0,
      speed = 0,
      oldX = 0,
      x = 0,
      startX = 0,
      dragging = false,
      wrapWidth = 0,
      maxScroll = 0;

    const calculate = () => {
      progress = 0;
      wrapWidth = items[0].clientWidth * items.length;
      wrap.style.width = `${wrapWidth}px`;
      maxScroll = wrapWidth - el.clientWidth;
    };

    const move = () => {
      progress = clamp(progress, 0, maxScroll);
    };

    const handleWheel = (e) => {
      progress += e.deltaY;
      move();
    };

    const handleTouchStart = (e) => {
      dragging = true;
      startX = e.clientX || e.touches[0].clientX;
      el.classList.add("dragging");
    };

    const handleTouchMove = (e) => {
      if (!dragging) return;
      const xMove = e.clientX || e.touches[0].clientX;
      progress += (startX - xMove) * 2.5;
      startX = xMove;
      move();
    };

    const handleTouchEnd = () => {
      dragging = false;
      el.classList.remove("dragging");
    };

    const raf = () => {
      x = lerp(x, progress, 0.1);
      const playrate = x / maxScroll;

      wrap.style.transform = `translateX(${-x}px)`;
      bar.style.transform = `scaleX(${0.18 + playrate * 0.82})`;

      speed = Math.min(100, oldX - x);
      oldX = x;

      const scaleXY = lerp(1, 1 - Math.min(Math.abs(speed) * 0.005, 0.2), 0.1);
      const scaleX = 1 + Math.abs(speed) * 0.004;

      items.forEach((item, idx) => {
        item.style.transform = `scale(${scaleXY})`;
        if (imgs[idx]) {
          imgs[idx].style.transform = `scale(${scaleX}, ${scaleXY})`;
        }
      });

      requestAnimationFrame(raf);
    };

    calculate();
    window.addEventListener("resize", calculate);
    window.addEventListener("wheel", handleWheel);
    el.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousedown", handleTouchStart);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchEnd);
    document.body.addEventListener("mouseleave", handleTouchEnd);

    raf();

    return () => {
      window.removeEventListener("resize", calculate);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousedown", handleTouchStart);
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchEnd);
      document.body.removeEventListener("mouseleave", handleTouchEnd);
    };
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden flex flex-col justify-center items-center font-sans bg-[#e9e9e9] z-50">
      <nav className="fixed top-0 w-full flex justify-between items-center">
        <a href="#" className="p-8 text-white text-base no-underline">
          Mouthwash
        </a>
        <a href="#" className="p-8 text-white text-base no-underline">
          Portfolio
        </a>
      </nav>
      <a
        id="showreel"
        href="#"
        className="absolute bottom-0 right-0 p-8 text-white text-base no-underline"
      >
        Showreel
      </a>

      <div ref={sliderRef} className="w-full cursor-grab relative">
        <div ref={wrapperRef} className="whitespace-nowrap">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="slider-item inline-block w-[40vw] p-[3vw] transition-transform duration-200 will-change-transform"
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <figure className="relative pb-[50%] overflow-hidden">
                <h2>NAME</h2>
                <img
                  src={src}
                  alt={`slide-${idx}`}
                  className="absolute w-full h-full object-cover will-change-transform transition-transform duration-200"
                  ref={(el) => (imgRefs.current[idx] = el)}
                />
              </figure>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 w-[20vw] h-[2px] m-8 bg-white/10">
          <div
            ref={barRef}
            className="absolute w-full h-full bg-white/80 origin-left scale-x-0 transition-transform duration-200"
          ></div>
        </div>
      </div>
    </div>
  );
}
