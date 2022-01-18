import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Social Media related queries
 */

/**
 * Queries
 */

export const GET_ALL_SOCIAL_MEDIAS = gql`
  {
    socialMedias {
      id
      platform
      url
      personId
    }
  }
`;
