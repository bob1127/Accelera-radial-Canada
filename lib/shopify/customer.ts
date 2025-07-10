import { CUSTOMER_ACCESS_TOKEN_CREATE } from '../shopify/mutations/customerAccessTokenCreate';
import { CUSTOMER_CREATE } from '../shopify/mutations/customerCreate';

const SHOPIFY_DOMAIN = "accelera-radial.ca";
const ACCESS_TOKEN = "ffe48fa71b4ab65c45768c16ae3108bc";

interface UserError {
  field: string[];
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

async function shopifyCustomerFetch<T>(
  query: string,
  variables: any
): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}

export async function customerLogin(
  email: string,
  password: string
): Promise<CustomerAccessTokenCreateResponse> {
  const data = await shopifyCustomerFetch<{
    customerAccessTokenCreate: CustomerAccessTokenCreateResponse;
  }>(CUSTOMER_ACCESS_TOKEN_CREATE, {
    input: { email, password },
  });

  return data.customerAccessTokenCreate;
}

export async function customerRegister(
  email: string,
  password: string
): Promise<CustomerCreateResponse> {
  const data = await shopifyCustomerFetch<{
    customerCreate: CustomerCreateResponse;
  }>(CUSTOMER_CREATE, {
    input: { email, password },
  });

  return data.customerCreate;
}
