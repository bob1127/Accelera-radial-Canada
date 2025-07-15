import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full bg-[#F0F1F2] pl-0 lg:pl-8 flex flex-col lg:flex-row pt-[200px] pb-[80px]">
        {/* 左側：篩選欄 - 在小螢幕置頂、滿版 */}
        <aside className="w-[90%] mx-auto lg:w-[25%] xl:w-[20%] py-10 bg-white space-y-6 px-4 mb-10 lg:mb-0">
          <FilterList title="Sort by" list={sorting} />
          {/* <FilterList title="胎寬 Width" list={widthFilters} />
          <FilterList title="扁平比 Aspect Ratio" list={aspectFilters} />
          <FilterList list={rimSizeFilters} title="輪圈尺寸" /> */}
        </aside>

        {/* 右側：內容 */}
        <div className="flex flex-col w-full lg:w-[75%] xl:w-[80%] px-4 lg:pl-10">
          <aside className="w-full">
            <Collections />
          </aside>

          <main className="w-full overflow-hidden ">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
