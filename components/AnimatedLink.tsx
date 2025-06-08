// components/AnimatedLink.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnimatedLink({
  href,
  children,
  className = "",
  direction = "up", // 可選 "up" 或 "down"
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down";
}) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      router.push(href);
    }, 400); // 和動畫時間對齊
  };

  return (
    <>
      <a onClick={handleClick} className={className}>
        {children}
      </a>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key="page-transition"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: 0,
              y: direction === "down" ? 30 : -30,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
