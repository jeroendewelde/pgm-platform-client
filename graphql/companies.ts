import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Company related queries
 */

/**
 * Queries
 */

export const GET_ALL_COMPANIES = gql`
{
  companies {
    id
    name
    teaserImage
  }
}`;