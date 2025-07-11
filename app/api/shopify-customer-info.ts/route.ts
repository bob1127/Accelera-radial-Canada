// /app/shopify-customer-info/route.ts
import { getCustomerInfo } from "@/lib/shopify/customer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "缺少 token" }, { status: 400 });
  }

  try {
    const customer = await getCustomerInfo(token);
    return NextResponse.json({ success: true, customer });
  } catch (err) {
    console.error("❌ 無法取得顧客資訊", err);
    return NextResponse.json({ error: "取得顧客資訊失敗" }, { status: 500 });
  }
}
