// app/api/storefront-create-customer/route.ts
import { NextResponse } from "next/server";

const STOREFRONT_API_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`;
const STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();

  // 1️⃣ 建立會員帳號
  const createRes = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              email
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        input: { email, password, firstName, lastName },
      },
    }),
  });

  const createJson = await createRes.json();
  const createData = createJson.data?.customerCreate;

  if (!createData || createData.userErrors.length > 0) {
    return NextResponse.json(
      { success: false, error: createData?.userErrors || "Create failed" },
      { status: 400 }
    );
  }

  // 2️⃣ 建立 accessToken（自動登入）
  const tokenRes = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        input: { email, password },
      },
    }),
  });

  const tokenJson = await tokenRes.json();
  const tokenData = tokenJson.data?.customerAccessTokenCreate;

  if (!tokenData || tokenData.userErrors.length > 0) {
    return NextResponse.json(
      { success: false, error: tokenData?.userErrors || "Login failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    accessToken: tokenData.customerAccessToken.accessToken,
    expiresAt: tokenData.customerAccessToken.expiresAt,
    message: "註冊並登入成功",
  });
}
