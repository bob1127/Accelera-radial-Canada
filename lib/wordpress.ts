// lib/wordpress.ts
export async function getPostsByCategory(slug: string) {
  const categoryRes = await fetch(
    `https://inf.fjg.mybluehost.me/website_f7181626/wp-json/wp/v2/categories?slug=${slug}`
  );
  const categoryData = await categoryRes.json();

  if (!categoryData.length) return [];

  const categoryId = categoryData[0].id;
  const postRes = await fetch(
    `https://inf.fjg.mybluehost.me/website_f7181626/wp-json/wp/v2/posts?categories=${categoryId}&_embed`
  );
  const posts = await postRes.json();

  return posts;
}
