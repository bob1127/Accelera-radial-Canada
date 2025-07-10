// app/api/admin-create-customer/route.ts
import { NextResponse } from "next/server";

const ADMIN_API_URL = "https://accelera-radial.myshopify.com/admin/api/2024-07/graphql.json";
const ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();

  try {
    // 1️⃣ 建立顧客
    const createCustomerRes = await fetch(ADMIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation customerCreate($input: CustomerInput!) {
            customerCreate(input: $input) {
              customer {
                id
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            email,
            firstName,
            lastName,
            acceptsMarketing: false,
          },
        },
      }),
    });

    const createJson = await createCustomerRes.json();
    const customerId = createJson.data.customerCreate.customer?.id;
    const createErrors = createJson.data.customerCreate.userErrors;

    if (!customerId) {
      return NextResponse.json({ success: false, error: createErrors }, { status: 400 });
    }

    // 2️⃣ 啟用帳號
    const activateCustomerRes = await fetch(ADMIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation customerActivate($id: ID!, $password: String!) {
            customerActivate(id: $id, input: { password: $password }) {
              customer {
                id
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          id: customerId,
          password,
        },
      }),
    });

    const activateJson = await activateCustomerRes.json();
    const activatedId = activateJson.data.customerActivate.customer?.id;
    const activateErrors = activateJson.data.customerActivate.userErrors;

    if (!activatedId) {
      return NextResponse.json({ success: false, error: activateErrors }, { status: 400 });
    }

    return NextResponse.json({ success: true, customerId: activatedId });
  } catch (error) {
    console.error("❌ Admin API 錯誤：", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
