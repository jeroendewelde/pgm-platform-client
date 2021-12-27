import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Agenda Item related queries
 */

/**
 * Queries
 */

export const GET_ALL_COURSES = gql`
{
  courses {
    data {
      attributes {
        name 
        description 
        periode
      }
    }
  }
}`;