import { CUSTOMER_ACCESS_TOKEN_CREATE } from "./mutations/customerAccessTokenCreate";
import { CUSTOMER_CREATE } from "./mutations/customerCreate";
import { CUSTOMER_RECOVER } from "./mutations/customerRecover"; // ✅ 新增
import { CUSTOMER_DETAILS } from "./queries/customerDetails";

const SHOPIFY_DOMAIN = "wdgc3h-wc.myshopify.com"; 
const ACCESS_TOKEN = "ffe48fa71b4ab65c45768c16ae3108bc";

interface UserError {
  field?: string[];
  message: string;
}

interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

interface CustomerAccessTokenCreateResponse {
  customerAccessToken?: CustomerAccessToken;
  userErrors: UserError[];
}

interface CustomerCreateResponse {
  customer?: {
    id: string;
    email: string;
  };
  userErrors: UserError[];
}

interface CustomerDetailsResponse {
  customer?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    orders: {
      edges: {
        node: {
          name: string;
          totalPrice: { amount: string; currencyCode: string };
        };
      }[];
    };
  };
}

async function shopifyCustomerFetch<T>(
  query: string,
  variables: any
): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// ✅ 註冊顧客
export async function customerRegister(email: string, password: string) {
  const data = await shopifyCustomerFetch<{ customerCreate: CustomerCreateResponse }>(
    CUSTOMER_CREATE,
    { input: { email, password } }
  );
  return data.customerCreate;
}

// ✅ 顧客登入
export async function customerLogin(email: string, password: string) {
  const data = await shopifyCustomerFetch<{ customerAccessTokenCreate: CustomerAccessTokenCreateResponse }>(
    CUSTOMER_ACCESS_TOKEN_CREATE,
    { input: { email, password } }
  );
  return data.customerAccessTokenCreate;
}

// ✅ 查詢顧客資訊（需要 accessToken）
export async function getCustomerInfo(token: string) {
  const data = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: CUSTOMER_DETAILS,
      variables: { customerAccessToken: token },
    }),
  }).then((res) => res.json());

  if (data.errors) throw new Error(JSON.stringify(data.errors));
  return data.data.customer as CustomerDetailsResponse["customer"];
}

// ✅ 忘記密碼（觸發 Shopify 寄出重設信）
export async function customerRecover(email: string) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: CUSTOMER_RECOVER,
      variables: { email },
    }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}
