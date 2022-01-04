import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Project related queries
 */

/**
 * Queries
 */

export const GET_ALL_PROJECTS = gql`
{
  projects {
    id
    name
    teaserText
    body
    academicYear
    tags
    courseId
  }
}`;