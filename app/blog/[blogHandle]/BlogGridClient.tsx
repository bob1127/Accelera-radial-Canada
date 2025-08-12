"use client";

import { cn } from "@/lib/utils";
import { IconClipboardCopy } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

/** 依你的 getBlogArticles 回傳結構自行微調 */
type Article = {
  id: string;
  handle: string;
  title: string;
  excerpt?: string | null;
  excerptHtml?: string | null; // 若有
  image?: {
    url: string;
    altText?: string | null;
  } | null;
  authorV2?: { name?: string | null } | null;
  publishedAt?: string | null;
};

export default function BlogGridClient({
  blogHandle,
  articles,
}: {
  blogHandle: string;
  articles: Article[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const totalPages = Math.max(1, Math.ceil((articles?.length || 0) / pageSize));

  const current = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return (articles || []).slice(start, start + pageSize);
  }, [articles, currentPage]);

  return (
    <div className="pb-20">
      <BentoGrid>
        {current.map((a, i) => {
          const image = a.image?.url;
          const title = a.title ?? "";
          const href = `/blog/${blogHandle}/${a.handle}`;

          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={cn(
                i % 7 === 0 ? "md:col-span-2 md:row-span-2" : "",
                i % 5 === 0 ? "md:col-span-2" : ""
              )}
            >
              <Link href={href} className="block h-full">
                <BentoGridItem
                  title={<span className="line-clamp-2">{title}</span>}
                  description={
                    a.excerptHtml ? (
                      <div
                        className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300"
                        dangerouslySetInnerHTML={{ __html: a.excerptHtml }}
                      />
                    ) : a.excerpt ? (
                      <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300">
                        {a.excerpt}
                      </p>
                    ) : null
                  }
                  header={
                    image ? (
                      <img
                        src={image}
                        alt={a.image?.altText || title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-48 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
                    )
                  }
                  icon={
                    <IconClipboardCopy className="h-4 w-4 text-neutral-500" />
                  }
                  className="h-full"
                  footer={
                    <div className="mt-3 text-xs text-neutral-500">
                      {(a.authorV2?.name || "—") +
                        " ・ " +
                        (a.publishedAt
                          ? new Date(a.publishedAt).toLocaleDateString()
                          : "")}
                    </div>
                  }
                />
              </Link>
            </motion.div>
          );
        })}
      </BentoGrid>

      {/* 分頁 */}
      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const active = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "px-4 py-2 rounded border transition-colors",
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
              )}
              aria-current={active ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}
