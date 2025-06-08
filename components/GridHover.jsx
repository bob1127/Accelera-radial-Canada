"use client";

import { useEffect, useRef } from "react";

const highlightImages = [
  "/images/hover06.jpg",
  "/images/hover01.jpg",
  "/images/534b4b_a36c31e1e814409b9b37492b26269e95.jpg",
  "/images/4MEBs75O8RvUWsKnrB0a.jpg",
  "/images/hover06.jpg",
  "/images/hover01.jpg",
  "/images/hover02.jpg",
  "/images/hover03.jpg",
  "/images/hover04.jpg",
  "/images/hover05s.jpg",
];

export default function HighlightGrid() {
  const containerRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    const gridItems = container.querySelectorAll(".grid-item");
    const firstItem = container.querySelector(".grid-item");

    const highlightColors = [
      "#E24E1B",
      "#4381C1",
      "#F79824",
      "#04A777",
      "#5B8C5A",
      "#2176FF",
      "#818D92",
      "#22AAA1",
    ];

    gridItems.forEach((item, index) => {
      item.dataset.color = highlightColors[index % highlightColors.length];
      item.dataset.image = highlightImages[index % highlightImages.length];
    });

    const moveToElement = (element) => {
      if (element && highlight) {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        highlight.style.transform = `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;
        highlight.style.backgroundColor = element.dataset.color;
        highlight.style.backgroundImage = `url(${element.dataset.image})`;
      }
    };

    const moveHighlight = (e) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      const isGridItem = hoveredElement?.classList.contains("grid-item")
        ? hoveredElement
        : hoveredElement?.parentElement?.classList.contains("grid-item")
          ? hoveredElement.parentElement
          : null;
      if (isGridItem) moveToElement(isGridItem);
    };

    moveToElement(firstItem);
    container.addEventListener("mousemove", moveHighlight);

    return () => {
      container.removeEventListener("mousemove", moveHighlight);
    };
  }, []);

  return (
    <div className="bg-[#0f0f0f] text-white font-mono min-h-screen">
      <nav className="fixed top-0 w-full p-4 flex justify-between items-center border-b border-white/20 z-10">
        <p className="uppercase text-sm font-medium">Codegrid</p>
        <p className="opacity-30 text-sm">/ Experiment 448</p>
      </nav>

      <div
        ref={containerRef}
        className="relative w-full min-h-screen flex items-center justify-center py-[25vh]"
      >
        <div className="grid w-[90%] border border-white/20">
          <div className="flex md:flex-row flex-col border-b border-white/20">
            <div className="grid-item flex-1 flex justify-center items-center border-r md:border-r border-white/20 py-16">
              <p className="uppercase text-sm font-medium">( PHI )</p>
            </div>
            <div className="grid-item flex-1 flex justify-center items-center border-r md:border-r border-white/20 py-16">
              <p className="uppercase text-sm font-medium">( Eco Plush )</p>
            </div>
            <div className="grid-item flex-1 flex justify-center items-center py-16">
              <p className="uppercase text-sm font-medium">( IOTA ST68 )</p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col">
            <div className="grid-item flex-1 flex justify-center items-center border-r md:border-r border-white/20 py-16">
              <p className="uppercase text-sm font-medium">( OMIKRON )</p>
            </div>
            <div className="grid-item flex-1 flex justify-center items-center border-r md:border-r border-white/20 py-16">
              <p className="uppercase text-sm font-medium">( X-GRIPN )</p>
            </div>
            <div className="grid-item flex-1 flex justify-center items-center border-r md:border-r border-white/20 py-16">
              <p className="uppercase text-sm font-medium">( 651SPORT )</p>
            </div>
            <div className="grid-item flex-1 flex justify-center items-center border-r md:border-r border-white/20 py-16">
              <p className="uppercase text-sm font-medium">( 351SPORT GD )</p>
            </div>
            <div className="grid-item flex-1 flex justify-center items-center py-16">
              <p className="uppercase text-sm font-medium">( MT01 )</p>
            </div>
          </div>
        </div>
        <div
          ref={highlightRef}
          className="highlight absolute top-0 left-0 pointer-events-none transition-all duration-200 ease-in-out opacity-100 mix-blend-lighten bg-cover bg-center"
        ></div>
      </div>
    </div>
  );
}
