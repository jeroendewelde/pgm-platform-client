import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Field experience related queries
 */

/**
 * Queries
 */

export const GET_ALL_FIELD_EXPERIENCES = gql`
{
  fieldExperiences {
    id
    duration
    company
    function
    description
    personId
  }
}`;