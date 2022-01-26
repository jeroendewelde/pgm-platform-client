import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All User related queries
 */

/**
 * Queries
 */

export const GET_ALL_USERS = gql`
{
  users {
    id
    username
    email
    password
    role
  }
}`;