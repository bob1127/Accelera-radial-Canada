"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("Welcome to Accelera Radial Canada", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            PT. Elangperdana Tyre Industry, established in 1996, produces
            high-performance tires in Bogor, Indonesia. With global
            certifications and exports to over 90 countries, we focus on safety,
            innovation, and customer satisfaction.
            <Link
              href="/about"
              className="text-[#e31f3a] hover:underline"
              target="_blank"
            >
              About Us
            </Link>
            <Image
              src="/images/notice/notice.jpg"
              alt="notice-img"
              width={400}
              height={300}
              className="w-[90%] m-4 mx-auto max-w-[450px] rounded-md"
            ></Image>
          </>
        ),
      });
    }
  }, []);

  return null;
}
