import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Generation related queries
 */

/**
 * Queries
 */

export const GET_ALL_GENERATIONS = gql`
{
  generations {
    id
    name
    years
  }
}`;