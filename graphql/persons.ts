import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Person related queries
 */

/**
 * Queries
 */

export const GET_ALL_PERSONS = gql`
{
  persons {
    id
    firstName
    lastName
    type
    generationId
  }
}`;