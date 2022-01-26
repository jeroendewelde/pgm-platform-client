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
  }
`;

export const GET_SPECIALISATION_BY_ID = gql`
  query getSpecialisationById($id: Int!) {
    specialisation(id: $id) {
      id
      name
      academicYear
    }
  }
`;

/**
 * Mutations
 */

export const CREATE_SPECIALISATION = gql`
  mutation createSpecialisation($input: CreateSpecialisationInput!) {
    createSpecialisation(createSpecialisationInput: $input) {
      id
      name
    }
  }
`;

export const UPDATE_SPECIALISATION = gql`
  mutation updateSpecialisation($input: UpdateSpecialisationInput!, $id: Int!) {
    updateSpecialisation(updateSpecialisationInput: $input, id: $id) {
      id
    }
  }
`;

export const DELETE_SPECIALISATION = gql`
  mutation deleteSpecialisation($id: Int!) {
    removeSpecialisation(id: $id) {
      name
    }
  }
`;
