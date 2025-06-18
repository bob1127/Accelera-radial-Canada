import ProductGridClient from "../../../components/ProductGridClient";

export default function CategoryPage({ params }: any) {
  const { collection } = params;
  return (
    <section className="w-full max-w-[1400px]  px-4">
      <ProductGridClient collection={collection} />
    </section>
  );
}
