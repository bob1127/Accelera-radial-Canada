"use client";

import ContactForm from "@/components/ContactForm";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "#f8fafc", // slate-50
  gradientBackgroundEnd = "#eeecec", // 橘白漸層底色 (淡橘)
  firstColor = "255, 120, 80", // 橘紅
  secondColor = "255, 160, 100", // 明橘
  thirdColor = "255, 200, 120", // 淡橘黃
  fourthColor = "255, 100, 80", // 橘紅偏粉
  fifthColor = "255, 230, 150", // 淺橘黃
  pointerColor = "255, 140, 100", // 滑鼠光暈橘紅

  size = "80%", // 預設大小
  blendingValue = "lighten", // 淺色系混合建議
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    if (!interactiveRef.current) return;
    const move = () => {
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current!.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    };
    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-screen w-screen rounded-tr-[90px] border-gray-50 rounded-tl-[90px] border-2  relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("", className)}>{children}</div>
      <div className="absolute z-20 top-[20%] left-[20%]">
        <div className="flex">
          <div className="txt w-1/2">
            <p className="w-1/2">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
              minima quis dolores maxime ullam alias dolor consequatur expedita
              voluptatibus id dicta mollitia veritatis officiis similique,
              recusandae perspiciatis vero reiciendis! Magnam!
            </p>
          </div>
          <div className="form w-1/2">
            {" "}
            <div className="min-h-screen py-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        {[
          {
            color: "--first-color",
            anim: "animate-first",
            origin: "center_center",
            opacity: "opacity-100",
          },
          {
            color: "--second-color",
            anim: "animate-second",
            origin: "calc(50%-400px)",
            opacity: "opacity-100",
            alpha: true,
          },
          {
            color: "--third-color",
            anim: "animate-third",
            origin: "calc(50%+400px)",
            opacity: "opacity-100",
            alpha: true,
          },
          {
            color: "--fourth-color",
            anim: "animate-fourth",
            origin: "calc(50%-200px)",
            opacity: "opacity-70",
            alpha: true,
          },
          {
            color: "--fifth-color",
            anim: "animate-fifth",
            origin: "calc(50%-800px)_calc(50%+800px)",
            opacity: "opacity-100",
            alpha: true,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,${
                item.alpha
                  ? `rgba(var(${item.color}), 0.8)_0, rgba(var(${item.color}), 0)_50%`
                  : `var(${item.color})_0, var(${item.color})_50%`
              })_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]`,
              `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:${item.origin}]`,
              item.anim,
              item.opacity
            )}
          ></div>
        ))}

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
