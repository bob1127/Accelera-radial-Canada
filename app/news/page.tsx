// /app/news/page.tsx
import NewsClient from "./NewsClient";

async function getPostsByCategory(slug: string) {
  const categoryRes = await fetch(
    `https://inf.fjg.mybluehost.me/website_f7181626/wp-json/wp/v2/categories?slug=${slug}`
  );
  const categoryData = await categoryRes.json();
  if (!categoryData.length) return [];

  const categoryId = categoryData[0].id;
  const postRes = await fetch(
    `https://inf.fjg.mybluehost.me/website_f7181626/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=100`,
    { next: { revalidate: 60 } }
  );
  return await postRes.json();
}

export default async function NewsPage() {
  const posts = await getPostsByCategory("news");
  return <NewsClient posts={posts} />;
}
