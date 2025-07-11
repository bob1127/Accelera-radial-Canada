import { NextResponse } from "next/server";

const ADMIN_API_URL = "https://wdgc3h-wc.myshopify.com/admin/api/2024-07/graphql.json";
const ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

export async function POST(req: Request) {
  const { email, firstName, lastName } = await req.json();
  const trimmedEmail = email.trim();

  try {
    // Step 1: 嘗試建立顧客
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
          input: {
            email: trimmedEmail,
            firstName,
            lastName,
          },
        },
      }),
    });

    const createJson = await createCustomerRes.json();
    console.log("🧾 customerCreate 回傳 JSON:", JSON.stringify(createJson, null, 2));

    let customerId = createJson.data?.customerCreate?.customer?.id;

    const userErrors = createJson.data?.customerCreate?.userErrors || [];

    // 如果 Email 已存在 → 查詢顧客 ID
    if (!customerId && userErrors.some((e: any) => e.message.includes("Email has already been taken"))) {
      const findCustomerRes = await fetch(ADMIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ADMIN_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: `
            query getCustomerByEmail($query: String!) {
              customers(first: 1, query: $query) {
                edges {
                  node {
                    id
                    email
                  }
                }
              }
            }
          `,
          variables: {
            query: `email:${trimmedEmail}`,
          },
        }),
      });

      const findCustomerJson = await findCustomerRes.json();
      console.log("🔍 查詢已存在的顧客 JSON:", JSON.stringify(findCustomerJson, null, 2));

      customerId = findCustomerJson.data?.customers?.edges?.[0]?.node?.id;
    }

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: userErrors.length > 0 ? userErrors : "找不到顧客 ID" },
        { status: 400 }
      );
    }

    // Step 2: 發送邀請信
    const inviteRes = await fetch(ADMIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation sendInvite($customerId: ID!) {
            customerSendInvite(id: $customerId) {
              customerInvite {
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
          customerId,
        },
      }),
    });

    const inviteJson = await inviteRes.json();
    console.log("📩 customerSendInvite 回傳 JSON:", JSON.stringify(inviteJson, null, 2));

    const inviteData = inviteJson.data?.customerSendInvite;

    if (!inviteData || inviteData.userErrors.length > 0) {
      return NextResponse.json(
        { success: false, error: inviteData?.userErrors || "Invite failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      customerId,
      message: `已發送邀請信至 ${inviteData.customerInvite.email}`,
    });
  } catch (error) {
    console.error("❌ Admin API 錯誤：", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
