// /app/news/NewsClient.tsx
"use client";
import { cn } from "@/lib/utils";
import { IconClipboardCopy } from "@tabler/icons-react";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import Link from "next/link";
import { useState } from "react";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";

function extractFirstImageFromContent(html: string): string | null {
  if (!html || typeof html !== "string") return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  if (match && match[1]) {
    return match[1]; // ✅ 回傳圖片網址字串
  }
  return null; // ✅ 若無匹配，回傳 null
}

export default function NewsClient({ posts }: { posts: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const start = (currentPage - 1) * pageSize;
  const currentPosts = posts.slice(start, start + pageSize);
  const totalPages = Math.ceil(posts.length / pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-[200px] pb-20">
      <BentoGrid>
        {currentPosts.map((post, i) => {
          const featuredImage =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const fallbackImage = extractFirstImageFromContent(
            post.content.rendered
          );
          const image = featuredImage || fallbackImage;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={cn(
                i % 7 === 0
                  ? "md:col-span-2 md:row-span-2"
                  : i % 5 === 0
                    ? "md:col-span-2"
                    : ""
              )}
            >
              <Link href={`/news/${post.slug}`} className="block h-full">
                <BentoGridItem
                  title={parse(post.title.rendered)}
                  description={
                    <div
                      className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                  }
                  header={
                    image ? (
                      <img
                        src={image}
                        alt=""
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
                />
              </Link>
            </motion.div>
          );
        })}
      </BentoGrid>

      <div className="mt-10 flex justify-center gap-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={cn(
              "px-4 py-2 border rounded",
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
