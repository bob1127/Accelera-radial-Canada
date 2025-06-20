import parse from "html-react-parser";
import { notFound } from "next/navigation";

export default async function Page({ params }: any) {
  const res = await fetch(
    `https://inf.fjg.mybluehost.me/website_f7181626/wp-json/wp/v2/posts?slug=${params.slug}&_embed`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  const post = data.length > 0 ? data[0] : null;
  if (!post) return notFound();

  return (
    <div className="max-w-6xl mx-auto pt-[180px] p-6">
      <h1 className="!text-[2.5em] font-bold mb-4">
        {parse(post.title.rendered)}
      </h1>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}
