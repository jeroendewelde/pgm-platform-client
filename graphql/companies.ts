import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Company related queries
 */

/**
 * Queries
 */

export const GET_ALL_COMPANIES = gql`
  {
    companies {
      id
      name
      teaserImage
    }
  }
`;

/**
 * Mutations
 */

export const CREATE_COMPANY = gql`
  mutation createCompany($input: CreateCompanyInput!) {
    createCompany(createCompanyInput: $input) {
      id
      name
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($id: Int!) {
    removeCompany(id: $id) {
      name
    }
  }
`;
