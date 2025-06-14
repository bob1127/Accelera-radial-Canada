import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import { aspectFilters, widthFilters } from "lib/shopify/filters";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full bg-[#F0F1F2] flex pt-[200px]">
        {/* 左側：分類清單 */}

        {/* 右側：排序選單 */}
        <aside className="w-[15%] space-y-6 px-4">
          <FilterList title="Sort by" list={sorting} />
          <FilterList title="胎寬 Width" list={widthFilters} />
          <FilterList title="扁平比 Aspect Ratio" list={aspectFilters} />
        </aside>

        <div className="flex flex-col w-[70%]">
          <aside className="w-full ">
            <Collections />
          </aside>

          {/* 中間：搜尋結果內容 */}
          <main className="w-full">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
