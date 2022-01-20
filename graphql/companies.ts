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

export const GET_COMPANY_BY_ID = gql`
  query getCompanyById($id: Int!) {
    company(id: $id) {
      id
      name
      teaserImage
      interns {
        id
        function
        description
        year
        studentId
      }
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

export const UPDATE_COMPANY = gql`
  mutation updateCompany($input: UpdateCompanyInput!, $id: Int!) {
    updateCompany(updateCompanyInput: $input, id: $id) {
      id
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
