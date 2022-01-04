import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Course related queries
 */

/**
 * Queries
 */

export const GET_ALL_COURSES = gql`
{
  courses {
    id
    name
    description
    term
    academicYear
    tags
    learningLineId
    specialisationId
    learningLine {
      id
      color
    }
  }
}`;