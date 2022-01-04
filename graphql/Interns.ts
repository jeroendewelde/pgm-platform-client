import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Intern related queries
 */

/**
 * Queries
 */

export const GET_ALL_INTERNS = gql`
{
  interns {
    id
    function
    description
    year
    studentId
    companyId
  }
}`;