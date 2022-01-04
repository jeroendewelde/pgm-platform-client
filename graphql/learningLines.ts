import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Learning Line related queries
 */

/**
 * Queries
 */

export const GET_ALL_LEARNINGLINES = gql`
{
  learningLines {
    id
    name
    color
  }
}`;