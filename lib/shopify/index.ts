// lib/shopify.ts
import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS
} from 'lib/constants';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag
} from 'next/cache';

import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '../shopify/mutations/customerAccessTokenCreate';
import { CUSTOMER_CREATE } from '../shopify/mutations/customerCreate';
import { ensureStartsWith } from '../utils';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';

import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

/** ---------- 基礎設定 ---------- */
const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error('Missing SHOPIFY env: SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN');
}

/** ---------- 小工具 ---------- */
type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 把 edges.nodes 攤平 */
const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return (array?.edges ?? []).map((edge) => edge?.node);
};

/** 影像補 alt 與扁平化 */
const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);
  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

/** ---------- 強化的 Shopify 取用器（含自動重試） ---------- */
export async function shopifyFetch<T>({
  headers,
  query,
  variables,
  retries = 2
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
  retries?: number;
}): Promise<{ status: number; body: T } | never> {
  // 簡潔且安全的 debug
  console.log('🔗 Shopify endpoint:', endpoint);
  if (key) console.log('🔑 Token prefix:', key.slice(0, 6) + '…');
  console.log('📦 Query preview:', (query || '').trim().slice(0, 80).replace(/\s+/g, ' ') + '…');

  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': key,
          ...headers
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables })
        }),
        // 你也可以改成 'force-cache' / 'no-store' 視需求
        cache: 'no-store'
      });

      const body = await result.json();

      if (!result.ok || (body as any)?.errors) {
        const status = result.status;
        const errors = (body as any)?.errors;
        // GraphQL 格式化錯誤
        if (errors) {
          console.error('Shopify GraphQL Errors:', errors);
        }

        // 429/5xx 自動重試
        if ((status === 429 || status >= 500) && attempt < retries) {
          const backoff = 500 * Math.pow(2, attempt); // 500ms, 1000ms, 2000ms…
          console.warn(`⚠️ Shopify ${status}. Retry in ${backoff}ms (attempt ${attempt + 1}/${retries})`);
          await wait(backoff);
          continue;
        }

        // 丟出第一個 GraphQL error 或 HTTP 錯誤
        throw (errors?.[0] || new Error(`Shopify HTTP ${status}`));
      }

      return { status: result.status, body };
    } catch (e) {
      lastError = e;
      // 非 HTTP 也做重試
      if (attempt < retries) {
        const backoff = 500 * Math.pow(2, attempt);
        console.warn(`⚠️ Network/unknown fetch error. Retry in ${backoff}ms`, e);
        await wait(backoff);
        continue;
      }
    }
  }

  console.error('❌ shopifyFetch failed:', lastError);
  throw lastError;
}

/** ---------- Cart 相關 ---------- */
const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode
    };
  }
  return { ...cart, lines: removeEdgesAndNodes(cart.lines) };
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation
  });
  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: { cartId, lines }
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds }
  });
  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: { cartId, lines }
  });
  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) return undefined;

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId }
  });

  if (!res.body.data.cart) return undefined;
  return reshapeCart(res.body.data.cart);
}

/** ---------- Collections ---------- */
const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) return undefined;
  return { ...collection, path: `/search/${collection.handle}` };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const out: Collection[] = [];
  for (const c of collections) {
    if (!c) continue;
    const shaped = reshapeCollection(c);
    if (shaped) out.push(shaped);
  }
  return out;
};

export async function getCollection(handle: string): Promise<Collection | undefined> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    variables: { handle }
  });
  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  'use cache';
  try {
    cacheTag(TAGS.collections, TAGS.products);
    cacheLife('days');

    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
      query: getCollectionProductsQuery,
      variables: {
        handle: collection,
        reverse,
        sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
      }
    });

    if (!res?.body?.data?.collection) {
      console.warn(`⚠️ No collection found for "${collection}"`);
      return [];
    }
    const edges = res.body.data.collection.products?.edges ?? [];
    return reshapeProducts(removeEdgesAndNodes({ edges }));
  } catch (err) {
    console.error(`❌ getCollectionProducts("${collection}") error:`, err);
    return [];
  }
}

export async function getCollections(): Promise<Collection[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery
  });

  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: { title: 'All', description: 'All products' },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    ...reshapeCollections(shopifyCollections).filter((c) => !c.handle.startsWith('hidden'))
  ];
  return collections;
}

/** ---------- Menu / Pages ---------- */
export async function getMenu(handle: string): Promise<Menu[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    variables: { handle }
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, '')
        .replace('/collections', '/search')
        .replace('/pages', '')
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });
  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });
  return removeEdgesAndNodes(res.body.data.pages);
}

/** ---------- Products ---------- */
const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }
  const { images, variants, ...rest } = product;
  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const out: Product[] = [];
  for (const p of products) {
    if (!p) continue;
    const shaped = reshapeProduct(p);
    if (shaped) out.push(shaped);
  }
  return out;
};

export async function getProduct(handle: string): Promise<Product | undefined> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: { handle }
  });
  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    variables: { productId }
  });
  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  first = 15,
  after
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number;
  after?: string;
}): Promise<{
  products: Product[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  console.log('🟡 getProducts vars:', { query, reverse, sortKey, first, after });

  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables: { query, reverse, sortKey, first, after }
  });

  const connection = res.body.data.products;
  const edges = connection?.edges ?? [];
  return {
    products: reshapeProducts(edges.map((e) => e.node)),
    pageInfo: { hasNextPage: connection.pageInfo.hasNextPage, endCursor: connection.pageInfo.endCursor }
  };
}

/** ---------- Customers ---------- */
export async function customerLogin(email: string, password: string) {
  const res = await shopifyFetch<any>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: { input: { email, password } }
  });
  return res.body.data.customerAccessTokenCreate;
}

export async function customerRegister(email: string, password: string) {
  const res = await shopifyFetch<any>({
    query: CUSTOMER_CREATE,
    variables: { input: { email, password } }
  });
  return res.body.data.customerCreate;
}

/** ---------- Blog（新增） ---------- */
/**
 * 取得某個 blog（以 handle）
 */
export async function getBlog(handle: string) {
  const query = /* GraphQL */ `
    query BlogByHandle($handle: String!) {
      blog(handle: $handle) {
        id
        handle
        title
        seo { title description }
      }
    }
  `;
  const res = await shopifyFetch<any>({ query, variables: { handle } });
  return res.body.data.blog;
}

/**
 * 取得文章列表（支援分頁、依 tag 過濾）
 */
export async function getBlogArticles(params: {
  blogHandle: string;
  first?: number;
  after?: string | null;
  tag?: string; // 例如 "news"
}) {
  const { blogHandle, first = 12, after, tag } = params;
  const query = /* GraphQL */ `
    query Articles($handle: String!, $first: Int!, $after: String, $query: String) {
      blog(handle: $handle) {
        id
        title
        articles(first: $first, after: $after, sortKey: PUBLISHED_AT, reverse: true, query: $query) {
          edges {
            cursor
            node {
              id
              handle
              title
              excerpt
              contentHtml
              publishedAt
              tags
              authorV2 { name }
              image { url altText width height }
            }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  `;
  // Shopify 的文章搜尋語法：tag:"xxx"
  const queryStr = tag ? `tag:"${tag}"` : undefined;
  const res = await shopifyFetch<any>({
    query,
    variables: { handle: blogHandle, first, after, query: queryStr }
  });

  const blog = res.body.data.blog;
  const edges = blog?.articles?.edges ?? [];
  return {
    blog,
    articles: edges.map((e: any) => e.node),
    pageInfo: blog?.articles?.pageInfo ?? { hasNextPage: false, endCursor: null }
  };
}

// 單篇文章（新增這段）
export async function getBlogArticle(blogHandle: string, articleHandle: string) {
  const query = /* GraphQL */ `
    query Article($blog: String!, $article: String!) {
      blog(handle: $blog) {
        articleByHandle(handle: $article) {
          id
          handle
          title
          contentHtml
          excerpt
          publishedAt
          tags
          authorV2 { name }
          image { url altText width height }
          seo { title description }
        }
      }
    }
  `;
  const res = await shopifyFetch<any>({
    query,
    variables: { blog: blogHandle, article: articleHandle }
  });
  return res.body.data.blog?.articleByHandle;
}
/** ---------- Revalidate（原樣，略加註解） ---------- */
// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // Always respond 200 to Shopify
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = (await headers()).get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) revalidateTag(TAGS.collections);
  if (isProductUpdate) revalidateTag(TAGS.products);

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
