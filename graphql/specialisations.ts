import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Specialisation related queries
 */

/**
 * Queries
 */

export const GET_ALL_SPECIALISATIONS = gql`
{
  specialisations {
    id
    name
    academicYear
  }
}`;