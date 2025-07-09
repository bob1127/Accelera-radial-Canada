"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const [direction, setDirection] = useState(0);

  const safeImageIndex =
    imageIndex >= 0 && imageIndex < images.length ? imageIndex : 0;
  const currentImage = images[safeImageIndex];

  const nextImageIndex =
    safeImageIndex + 1 < images.length ? safeImageIndex + 1 : 0;
  const previousImageIndex =
    safeImageIndex === 0 ? images.length - 1 : safeImageIndex - 1;

  const handleChangeImage = (newIndex: number, dir: number) => {
    setDirection(dir);
    const newState = updateImage(newIndex.toString());
    updateURL(newState);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const buttonClassName =
    "h-10 w-10 m-2 bg-white/60 hover:bg-white rounded-full shadow-md transition-all ease-in-out flex items-center justify-center text-black/60 hover:text-black";

  return (
    <div className="flex w-full">
      <form className="sm:w-[80%] w-full xl:w-1/2 mx-auto">
        <div className="relative aspect-[3.9/4] w-full sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto overflow-hidden">
          <div className="relative h-full w-full">
            <AnimatePresence custom={direction} mode="wait">
              {currentImage && (
                <motion.div
                  key={currentImage.src}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    className="object-contain"
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    alt={currentImage.altText || ""}
                    src={currentImage.src}
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  type="button"
                  onClick={() => handleChangeImage(previousImageIndex, -1)}
                  aria-label="Previous product image"
                  className={buttonClassName}
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="button"
                  onClick={() => handleChangeImage(nextImageIndex, 1)}
                  aria-label="Next product image"
                  className={buttonClassName}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {images.length > 1 && (
          <ul className="mt-6 flex items-center justify-center gap-3 overflow-x-auto px-2 py-1 scrollbar-hide">
            {images.map((image, index) => {
              const isActive = index === safeImageIndex;
              return (
                <li
                  key={image.src}
                  className={`rounded-md !pt-2 p-1 ring-2 ${
                    isActive ? "ring-white" : "ring-transparent"
                  } transition-all duration-200`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleChangeImage(index, index > safeImageIndex ? 1 : -1)
                    }
                    aria-label="Select product image"
                    className="h-16 w-16 sm:h-20 sm:w-20"
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={80}
                      height={80}
                      active={isActive}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </form>
    </div>
  );
}
