"use client";

import { useEffect, useRef } from "react";

const highlightImages = [
  "/images/our-beginning/tracing.webp",
  "/images/hover01.jpg",
  "/images/534b4b_a36c31e1e814409b9b37492b26269e95.jpg",
  "/images/4MEBs75O8RvUWsKnrB0a.jpg",
  "/images/our-beginning/472642056_18479663083032449_1990468263412520619_n_結果.webp",
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
    <div className="bg-[#0f0f0f] pt-[100px] text-white font-mono">
      <div
        ref={containerRef}
        className="relative flex-col w-full flex items-center justify-center "
      >
        <div className="title flex flex-col justify-center  mb-8 items-center">
          <h2 className="text-gray-100 text-[45px] font-bold">OUR BEGINNING</h2>
          <p className="text-gray-100 leading-relaxed max-w-[1000px] text-center">
            PT. Elangperdana Tyre Industry started in producing its ﬁrst tyre in
            year 1996. The factory is located at a unique landscape near
            mountain side in Sub - County Citeureup, Bogor city, three
            kilometers north of the Sentul International Circuit with a total
            area of 208,000 sqm of land. Well planned factory design combined
            with the latest technology machinery and equipments from Europe is
            our basic asset in making our tires. Safety Concern, Innovation,
            Creativity, and Customer Orientation are factors which we have and
            by combining these factors we produce our tires in order to meet
            your expectation for a tire.
          </p>
        </div>
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
