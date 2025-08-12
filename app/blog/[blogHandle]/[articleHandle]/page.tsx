import { getBlogArticle } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type RouteParams = { blogHandle: string; articleHandle: string };

/** SEO */
export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { blogHandle, articleHandle } = await params; // ✅ PPR 需 await
  const article = await getBlogArticle(blogHandle, articleHandle);
  if (!article) return {};

  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.excerpt || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.authorV2?.name ? [article.authorV2.name] : undefined,
      images: article.image?.url ? [{ url: article.image.url }] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { blogHandle, articleHandle } = await params; // ✅
  const article = await getBlogArticle(blogHandle, articleHandle);
  if (!article) notFound();

  return (
    <main className="mx-auto max-w-6xl py-[150px] px-4">
      <div className="mb-6 text-sm text-neutral-500">
        <Link href={`/blog/${blogHandle}`} className="underline">
          ← Back
        </Link>
      </div>

      <h1 className="text-3xl font-semibold leading-tight">{article.title}</h1>

      <div className="mt-3 text-sm text-neutral-500">
        <span>{article.authorV2?.name ?? "—"}</span>
        {article.publishedAt && (
          <>
            <span className="mx-2">•</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </time>
          </>
        )}
        {article.tags?.length ? (
          <>
            <span className="mx-2">•</span>
            <span>{article.tags.join(", ")}</span>
          </>
        ) : null}
      </div>

      {article.image?.url && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={article.image.url}
            alt={article.image.altText || article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority={false}
          />
        </div>
      )}

      <article
        className="prose prose-neutral max-w-none mt-8"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <div className="mt-10">
        <Link
          href={`/blog/${blogHandle}`}
          className="inline-block rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
        >
          Back to Blog List
        </Link>
      </div>
    </main>
  );
}
