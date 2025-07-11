export const CUSTOMER_RECOVER = /* GraphQL */ `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      userErrors {
        field
        message
      }
    }
  }
`;
