import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Enum related queries
 */

/**
 * Queries
 */

export const GET_ALL_PERSON_TYPES = gql`
  query {
    __type(name: "PersonType") {
      name
      enumValues {
        name
      }
    }
  }
`;

export const GET_ALL_SOCIAL_MEDIA_PLATFORMS = gql`
  query {
    __type(name: "SocialMediaPlatform") {
      name
      enumValues {
        name
      }
    }
  }
`;
