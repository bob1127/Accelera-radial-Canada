"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useRef } from "react";

gsap.registerPlugin(CustomEase);

const Photos = () => {
  const sliderImagesRef = useRef(null);
  const counterRef = useRef(null);
  const titlesRef = useRef(null);
  const indicatorsRef = useRef(null);
  const previewsRef = useRef([]);
  const sliderRef = useRef(null);

  const imagePaths = [
    "/images/index/banner/banner05.jpg",
    "/images/index/banner/banner01.jpg",
    "/images/index/banner/banner02.jpg",
    "/images/index/banner/banner04.jpg",
  ];

  useGSAP(() => {
    CustomEase.create(
      "hop2",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );

    let currentImg = 1;
    const totalSlides = imagePaths.length;
    let indicatorRotation = 0;

    const updateCounterAndTitlePosition = () => {
      const counterY = -20 * (currentImg - 1);
      const titleY = -60 * (currentImg - 1);

      gsap.to(counterRef.current, {
        y: counterY,
        duration: 1,
        ease: "hop2",
      });

      gsap.to(titlesRef.current, {
        y: titleY,
        duration: 1,
        ease: "hop2",
      });
    };

    const updateActiveSlidePreview = () => {
      previewsRef.current.forEach((prev, i) => {
        if (prev) {
          prev.classList.toggle("opacity-100", i + 1 === currentImg);
          prev.classList.toggle("opacity-40", i + 1 !== currentImg);
        }
      });
    };

    const animateSlide = (direction) => {
      const currentSlide = sliderImagesRef.current.lastElementChild;
      const slideImg = document.createElement("div");
      slideImg.className = "absolute inset-0 w-full h-full";

      const img = document.createElement("img");
      img.src = imagePaths[currentImg - 1];
      img.className = "w-full h-full object-cover";
      gsap.set(img, { x: direction === "left" ? -500 : 500 });

      slideImg.appendChild(img);
      sliderImagesRef.current.appendChild(slideImg);

      const tl = gsap.timeline();

      tl.to(currentSlide.querySelector("img"), {
        x: direction === "left" ? 500 : -500,
        duration: 1.5,
        ease: "hop2",
      })
        .fromTo(
          slideImg,
          {
            clipPath:
              direction === "left"
                ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop2",
          },
          0
        )
        .to(
          img,
          {
            x: 0,
            duration: 1.5,
            ease: "hop2",
          },
          0
        )
        .call(() => cleanupSlides(), null, 1.5);

      indicatorRotation += direction === "left" ? -90 : 90;
      gsap.to(indicatorsRef.current?.children, {
        rotate: indicatorRotation,
        duration: 1,
        ease: "hop2",
      });
    };

    const cleanupSlides = () => {
      const imgElements = sliderImagesRef.current.querySelectorAll("div");
      if (imgElements.length > totalSlides) {
        gsap.to(imgElements[0], {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            imgElements[0].remove();
          },
        });
      }
    };

    const nextSlide = () => {
      currentImg = currentImg < totalSlides ? currentImg + 1 : 1;
      animateSlide("right");
      updateActiveSlidePreview();
      updateCounterAndTitlePosition();
    };

    const interval = setInterval(nextSlide, 4000);

    const handleClick = (event) => {
      const sliderWidth = sliderRef.current.clientWidth;
      const clickX = event.clientX;

      if (clickX < sliderWidth / 2 && currentImg !== 1) {
        currentImg--;
        animateSlide("left");
      } else if (clickX > sliderWidth / 2 && currentImg !== totalSlides) {
        currentImg++;
        animateSlide("right");
      }

      updateActiveSlidePreview();
      updateCounterAndTitlePosition();
    };

    sliderRef.current.addEventListener("click", handleClick);

    return () => {
      sliderRef.current.removeEventListener("click", handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative  aspect-[16/14]  w-screen sm:aspect-[16/10] lg:aspect-[16/7]  2xl:aspect-[16/9] overflow-hidden cursor-pointer"
    >
      <div ref={sliderImagesRef} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imagePaths[0]}
            alt="slide"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Photos;
