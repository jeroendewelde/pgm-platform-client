import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Person Information related queries
 */

/**
 * Queries
 */

export const GET_ALL_PERSONINFORMATIONS = gql`
{
  personInformations {
    id
    quote
    bio
    dob
    personId
  }
}`;