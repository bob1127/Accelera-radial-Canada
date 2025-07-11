// app/api/collections/route.ts
import { getCollections } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET() {
  const collections = await getCollections();

  const simplified = collections.map((col) => ({
    title: col.title,
    handle: col.handle,
  }));

  return NextResponse.json(simplified);
}
