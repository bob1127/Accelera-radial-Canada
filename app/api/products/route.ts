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

  return NextResponse.json(result);
}
