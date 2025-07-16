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
        <div className="txt absolute z-40 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
          <h2 className="text-white font-extrabold text-[8vmin]">
            TIRES STORE
          </h2>
          <Link href="/search">
            <div className="bg-white text-slate-800 text-center text-[16px] px-4 py-2">
              {" "}
              GO STORE
            </div>
          </Link>
        </div>
        <div className="mask absolute top-0 left-0 bg-black opacity-60 w-full h-full z-30"></div>
      </div>

      <div className=" md:w-[85%] w-[95%] xl:w-[70%] flex lg:flex-row flex-col mx-auto py-8">
        <div className="left pt-4 w-1/3 mx-3">
          <Link href="/">
            <div className="w-[140px]">
              <Image
                src="/images/Logo/footer-logo.png"
                width={300}
                height={60}
                className="w-[50px] h-auto"
                alt="company-logo"
                loading="lazy"
                placeholder="empty"
              />
            </div>
          </Link>
        </div>
        <div className="middle flex  mx-3 w-1/3 pt-4">
          <ul className="flex flex-col">
            <b className="text-gray-800">PRODUCTS</b>
            <Link href="/search/omikron" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                OMIKRON
              </li>
            </Link>
            <Link href="/search/eco-plush" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                Eco Plush
              </li>
            </Link>
            <Link href="/search/iota-st-68" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                IOTA ST68
              </li>
            </Link>
            <Link href="/search/phi" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                PHI
              </li>
            </Link>
          </ul>
          <ul className="flex flex-col ml-5">
            <b className="text-gray-800 opacity-0">PRODUCTS</b>
            <Link href="/search/x-grip-n" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                X-GRIP N
              </li>
            </Link>
            <Link href="/search/651-sport-pro" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                651 SPORT
              </li>
            </Link>
            <Link href="/search/351-sport-gd" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                351 SPRT GD
              </li>
            </Link>
            <Link href="/search/mt-01" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                MT-01
              </li>
            </Link>
          </ul>
          <ul className="flex flex-col ml-5">
            <b className="text-gray-800 opacity-0">PRODUCTS</b>
            <Link href="/search/iota-evt" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                IOTA-EVT
              </li>
            </Link>
          </ul>
        </div>
        <div className="right pl-0 lg:pl-10 mx-3 w-1/3 pt-4">
          <ul className="flex flex-col ml-5">
            <b className="text-gray-800 ">INFO</b>
            <Link href="/search/x-grip-n" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                Privacy
              </li>
            </Link>
            <Link href="/search/651-sport-pro" className="mt-1">
              <li className="group flex items-center gap-2 w-[140px] text-slate-950">
                <span className="hidden w-[20px] duration-500 group-hover:block transition-opacity ">
                  <img
                    src="/images/footer/free-tire-svgrepo-com.svg"
                    alt="icon"
                    className="w-[20px]"
                  />
                </span>
                About Us
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="relative z-10  border-t-1 border-gray-300 bg-slate-50 flex justify-center items-center flex-col sm:flex-row text-center py-4">
        <div className="my-5">
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
