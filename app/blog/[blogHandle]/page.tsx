// app/blog/[blogHandle]/page.tsx
import { getBlogArticles } from "@/lib/shopify";
import BlogGridClient from "./BlogGridClient";

export const dynamic = "force-dynamic";

type Params = { blogHandle: string };

export default async function BlogListPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { blogHandle } = await params; // ✅ PPR 需 await

  const data = await getBlogArticles({ blogHandle, first: 50 });

  if (!data?.blog) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold mb-2">找不到 Blog</h1>
        <p>handle：{blogHandle}</p>
      </main>
    );
  }

  const articles = data.articles || [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-[150px]">
      <h1 className="text-2xl font-semibold mb-6">{data.blog.title}</h1>
      <BlogGridClient blogHandle={blogHandle} articles={articles} />
    </main>
  );
}
