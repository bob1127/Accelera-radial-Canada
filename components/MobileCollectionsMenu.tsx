"use client";

import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function MobileCollectionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [collections, setCollections] = useState<
    { title: string; handle: string }[]
  >([]);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data || []);
      });
  }, []);

  return (
    <>
      <button
        onClick={openMenu}
        className="flex h-11 w-11 items-center justify-center text-white md:hidden"
        aria-label="Open collections menu"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 w-[100%] max-w-5xl bg-white dark:bg-black p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="h-10 w-10 flex items-center justify-center border rounded"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <ul className="space-y-3">
                {/* Products 父項目 */}
                <li>
                  <button
                    className="flex w-full items-center justify-between text-lg font-medium text-black dark:text-white"
                    onClick={() => setIsProductsOpen((prev) => !prev)}
                  >
                    PRODUCTS
                    <ChevronDownIcon
                      className={`h-5 w-5 transform transition-transform duration-200 ${
                        isProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* 子選單：collection 項目 */}
                  {isProductsOpen && (
                    <ul className="mt-2 space-y-2">
                      {collections.map((col) => (
                        <li key={col.handle}>
                          <Link
                            href={`/search/${col.handle}`}
                            onClick={closeMenu}
                            className="block w-full rounded-md px-3 py-3 text-base text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            {col.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li>
                  <Link href="/news" className="text-lg font-medium text-black">
                    NEWS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-black"
                  >
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-black"
                  >
                    CONTACT
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-lg font-medium text-black">
                    CART
                  </Link>
                </li>
              </ul>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
