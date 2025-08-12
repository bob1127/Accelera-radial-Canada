export const getBlogArticleQuery = /* GraphQL */ `
  query ArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      title
      handle
      articleByHandle(handle: $articleHandle) {
        id
        title
        handle
        contentHtml
        excerpt
        excerptHtml
        tags
        publishedAt
        image {
          url
          altText
        }
        authorV2 {
          name
        }
      }
    }
  }
`;
