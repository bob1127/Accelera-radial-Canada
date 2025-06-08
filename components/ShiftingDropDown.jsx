"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";

export const ShiftingDropDown = () => {
  return (
    <div className="flex h-[30px]   pt-[] text-neutral-200 justify-center">
      <Tabs />
    </div>
  );
};

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  const tabData = TABS.find((t) => t.id === tab);

  const isLink = tabData?.isLink;
  const href = tabData?.href || "#";

  const onClick = (e) => {
    if (isLink) return; // 不觸發 dropdown
    handleSetSelected(tab);
  };

  return (
    <a
      href={isLink ? href : "#"}
      onMouseEnter={() => !isLink && handleSetSelected(tab)}
      onClick={onClick}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab && !isLink
          ? " bg-neutral-800 text-neutral-100"
          : "text-neutral-400"
      }`}
    >
      <span>{children}</span>
      {!isLink && (
        <FiChevronDown
          className={`transition-transform ${
            selected === tab ? "rotate-180" : ""
          }`}
        />
      )}
    </a>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[960px] max-w-[95vw] rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4 z-50 shadow-xl"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 "
    />
  );
};

const Products = () => {
  return (
    <div className="w-full px-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex bg-neutral-800 hover:border  rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/OMIKRON.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              OMIKRON
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE EDGY ALL-TERRAIN TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/EcoPlush.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              Eco Plush
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE ECO-FRIENDLY TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/IOTA_ST68.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              IOTA ST68
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE MODERN SUV TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/PHI.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">PHI</h2>
            <span className="text-xs text-neutral-300 text-center">
              THE VERSATILE TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/X-GRIPN.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              X-GRIP N
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE STUDLESS WINTER TIRE DESIGNED FOR SAFETY
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/651SPORT.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              651 SPORT
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE RACE TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/351SPORT-GD.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              351 SPORT GD
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              Grassroot Drift
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/MT01.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">MT01</h2>
            <span className="text-xs text-neutral-300 text-center">
              THE MUD-TERRAIN TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/IOTA-EVT.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              IOTA-EVT
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              PERFORMANCE FOR EVERY DRIVE
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-1 text-sm text-indigo-300 hover:underline">
          <span>View more</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

const Intro = () => {
  return (
    <div className="w-full px-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex bg-neutral-800 hover:border  rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/OMIKRON.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              OMIKRON
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE EDGY ALL-TERRAIN TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/EcoPlush.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              Eco Plush
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE ECO-FRIENDLY TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/IOTA_ST68.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              IOTA ST68
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE MODERN SUV TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/PHI.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">PHI</h2>
            <span className="text-xs text-neutral-300 text-center">
              THE VERSATILE TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/X-GRIPN.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              X-GRIP N
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE STUDLESS WINTER TIRE DESIGNED FOR SAFETY
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/651SPORT.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              651 SPORT
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              THE RACE TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/351SPORT-GD.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              351 SPORT GD
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              Grassroot Drift
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/MT01.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">MT01</h2>
            <span className="text-xs text-neutral-300 text-center">
              THE MUD-TERRAIN TIRE
            </span>
          </div>
        </div>
        <div className="flex bg-neutral-800 rounded-md overflow-hidden shadow-md">
          <div className="w-1/2">
            <img
              src="/images/TireCategories/IOTA-EVT.png"
              className="w-full h-full object-contain"
              alt="Omikron Tire"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-4">
            <h2 className="text-white font-bold text-left text-base">
              IOTA-EVT
            </h2>
            <span className="text-xs text-neutral-300 text-center">
              PERFORMANCE FOR EVERY DRIVE
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-1 text-sm text-indigo-300 hover:underline">
          <span>View more</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

const TABS = [
  {
    title: "Products",
    Component: Products,
  },
  {
    title: "Intro",
    Component: Intro,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
