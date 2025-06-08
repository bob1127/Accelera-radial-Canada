// lib/shopify/queries/getCollections.ts
export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 10) {
      edges {
        node {
          id
          handle
          title
          image {
            url
          }
        }
      }
    }
  }
`;

export const getCollectionByHandleQuery = /* GraphQL */ `
  query getCollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      title
      products(first: 12) {
        edges {
          node {
            id
            handle
            title
            featuredImage {
              url
            }
          }
        }
      }
    }
  }
`;
