"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const copyrightDate = currentYear > 2025 ? `2025-${currentYear}` : "2025";

export default function Footer() {
  return (
    <footer className="relative text-sm text-neutral-500 dark:text-neutral-400 overflow-hidden">
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh]">
        <Image
          src="/images/footer/WhatsApp_Image_2025-05-23_at_3.13.42_PM.png"
          alt="footer background"
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="txt absolute z-50 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
          <h2 className="text-white font-extrabold text-[58px]">TIRES STORE</h2>
          <Link href="/search">
            <div className="bg-white text-slate-800 text-center text-[16px] px-4 py-2">
              {" "}
              GO STORE
            </div>
          </Link>
        </div>
        <div className="mask absolute top-0 left-0 bg-black opacity-50 w-full h-full z-40"></div>
      </div>

      <div className="w-[70%] flex mx-auto py-8">
        <div className="left w-1/3 mx-3">
          <Image
            src="/images/Logo/footer-logo.png"
            width={250}
            height={60}
            className="max-w-[150px]"
            alt="company-logo"
            loading="lazy"
            placeholder="empty"
          />
        </div>
        <div className="middle border-t-1 mx-3 w-1/3"></div>
        <div className="right mx-3 w-1/3"></div>
      </div>

      <div className="relative z-10 flex justify-center items-center text-center py-4">
        <div>
          <Link target="_blank" href="https://www.jeek-webdesign.com.tw">
            <span className="text-[.9rem] text-gray-600">
              Design By <b>Jeek Web Design</b>
            </span>
          </Link>
          <p>© {copyrightDate} Accelera. All rights reserved.</p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="ml-4"
        >
          <Image
            src="/images/TireCategories/Accelera-white-tire-stickers-center-4-decals.png"
            width={250}
            height={60}
            className="max-w-[120px]"
            alt="rolling tire"
            loading="lazy"
            placeholder="empty"
          />
        </motion.div>
      </div>
    </footer>
  );
}
