// app/search/[collection]/page.tsx
import ProductGridClient from "components/ProductGridClient";

export default function CategoryPage() {
  return (
    <section className="w-full max-w-[1400px] px-4">
      <ProductGridClient />
    </section>
  );
}
