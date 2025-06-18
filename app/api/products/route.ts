// app/api/products/route.ts
import { getProducts } from 'lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query, reverse, sortKey, first, after } = await req.json();

  const result = await getProducts({
    query,
    reverse,
    sortKey,
    first,
    after
  });

  // 🆕 加入符合條件商品的總數
  const totalCount = result?.pageInfo?.hasNextPage
    ? await getProducts({ query, reverse, sortKey, first: 250 }).then(r => r.products.length)
    : result.products.length;

  return NextResponse.json({
    products: result.products,
    pageInfo: result.pageInfo,
    totalCount // ✅ 新增回傳總數
  });
}
