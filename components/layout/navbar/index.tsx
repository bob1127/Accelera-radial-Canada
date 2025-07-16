import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import NavbarClient from "./NavbarClient"; // 假設你存在這個檔案中

import MobileCollectionsMenu from "@/components/MobileCollectionsMenu";
import { Suspense } from "react";
import { ShiftingDropDown } from "../../ShiftingDropDown.jsx";

import Search, { SearchSkeleton } from "./search";
const { SITE_NAME } = process.env;
export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className=" flex flex-col items-center justify-between  fixed w-full z-50 top-0 ">
      <div className="top-nav bg-gradient-to-r from-[#000000]  to-[#272727] px-8 p-1 py-2 w-full">
        <div className="flex w-full items-center justify-between relative">
          {/* 左側：手機版 Menu */}
          <div className="w-1/3 flex md:hidden">
            <Suspense fallback={null}>
              <MobileCollectionsMenu />
            </Suspense>
          </div>

          {/* 中間：Logo，手機版 absolute 置中，桌機版正常排列 */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex w-[100px] items-center justify-center md:w-[130px]">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <Image
                src="/images/Logo/Accelera-LOGO.png"
                alt="logo"
                width={400}
                height={80}
                className="w-[80px]"
              />
            </Link>
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* 右側：搜尋 + 客戶端區塊 + 購物車 */}
          <div className="w-1/3 flex justify-end items-center">
            <div className="hidden md:block pr-4">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <NavbarClient />
            <CartModal />
          </div>
        </div>
      </div>
      <div
        className={`
          hidden sm:block
    bottom-nav 
    w-full 
    p-2 
    bg-white/30 
    backdrop-blur-md 
    transition-all 
    duration-300 
    hover:bg-white
  `}
      >
        <div className="flex justify-center">
          <ShiftingDropDown />
          <div className="link-wrap ml-2 mt-1 flex gap-2">
            <Link
              href="/news"
              className="text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-full duration-300 px-4  text-sm"
            >
              News
            </Link>
            <Link
              href="/about"
              className="text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-full duration-300 px-4  text-sm"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-full duration-300 px-4  text-sm"
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-full duration-300 px-4  text-sm"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
