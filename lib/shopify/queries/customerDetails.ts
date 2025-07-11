export const CUSTOMER_DETAILS = /* GraphQL */ `
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      orders(first: 5) {
        edges {
          node {
            name
            totalPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
