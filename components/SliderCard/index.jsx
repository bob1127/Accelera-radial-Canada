// CapsuleStickyCards.jsx
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
export default function CapsuleStickyCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new (require("@studio-freight/lenis"))();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray(".card");
    const introCard = cards[0];

    const titles = gsap.utils.toArray(".card-title h1");
    titles.forEach((title) => {
      const split = new SplitType(title, { types: "chars", tagName: "div" });
      split.chars.forEach((char) => {
        char.innerHTML = `<span>${char.textContent}</span>`;
      });
    });

    const cardImgWrapper = introCard.querySelector(".card-img");
    const cardImg = introCard.querySelector(".card-img img");
    gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
    gsap.set(cardImg, { scale: 1.5 });

    const titleChars = introCard.querySelectorAll(".char span");
    const description = introCard.querySelector(".card-description");

    function animateContentIn(titleChars, description) {
      gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
      gsap.to(description, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.1,
        ease: "power4.out",
      });
    }

    function animateContentOut(titleChars, description) {
      gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
      gsap.to(description, {
        x: "40px",
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    ScrollTrigger.create({
      trigger: introCard,
      start: "top top",
      end: "+=300vh",
      onUpdate: (self) => {
        const progress = self.progress;
        const imgScale = 0.5 + progress * 0.5;
        const borderRadius = 400 - progress * 375;
        const innerImgScale = 1.5 - progress * 0.5;

        gsap.set(cardImgWrapper, {
          scale: imgScale,
          borderRadius: borderRadius + "px",
        });
        gsap.set(cardImg, { scale: innerImgScale });

        if (progress >= 1 && !introCard.contentRevealed) {
          introCard.contentRevealed = true;
          animateContentIn(titleChars, description);
        }
        if (progress < 1 && introCard.contentRevealed) {
          introCard.contentRevealed = false;
          animateContentOut(titleChars, description);
        }
      },
    });

    cards.forEach((card, index) => {
      const isLastCard = index === cards.length - 1;
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const cardWrapper = card.querySelector(".card-wrapper");
        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardWrapper, {
              scale: 1 - progress * 0.25,
              opacity: 1 - progress,
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index > 0) {
        const cardImg = card.querySelector(".card-img img");
        const imgContainer = card.querySelector(".card-img");
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardImg, { scale: 2 - progress });
            gsap.set(imgContainer, {
              borderRadius: 150 - progress * 125 + "px",
            });
          },
        });
      }
    });

    cards.forEach((card, index) => {
      if (index === 0) return;
      const cardDescription = card.querySelector(".card-description");
      const cardTitleChars = card.querySelectorAll(".char span");
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        onEnter: () => animateContentIn(cardTitleChars, cardDescription),
        onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
      });
    });
  }, []);

  const cardContent = [
    {
      title: "ENDURE",
      desc: "A futuristic residence that plays with curvature and flow, blending bold geometry with natural topography.",
      img: "/card-img-1.webp",
    },
    {
      title: "GRIP",
      desc: "A sleek pavilion of pure transparency, openness and light, designed to dissolve into its environment.",
      img: "/card-img-2.webp",
    },
    {
      title: "SPEED",
      desc: "A minimalist cube home crowned with a living moss dome, merging micro-architecture with ecological design.",
      img: "/card-img-3.webp",
    },
    {
      title: "RIDE",
      desc: "This design explores an ethereal structure perched on a grassy islet, seemingly hovering above water.",
      img: "/card-img-4.webp",
    },
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#0e0e0e]">
      <section className="intro h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center max-w-3xl">
          Drive Beyond Limits
        </h1>
      </section>
      <section className="cards">
        {cardContent.map((card, index) => (
          <div
            key={index}
            className="card w-full h-screen flex items-center justify-center"
          >
            <div className="card-wrapper relative w-full p-4">
              <div className="card-content mb-4">
                <div className="card-title">
                  <h1 className="text-3xl font-bold">{card.title}</h1>
                </div>
                <div className="card-description opacity-0 translate-x-10 transition-all">
                  <p>{card.desc}</p>
                </div>
              </div>
              <div className="card-img absolute inset-0 overflow-hidden rounded-[150px]">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
