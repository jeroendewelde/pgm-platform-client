import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Person related queries
 */

/**
 * Queries
 */

export const GET_ALL_PERSONS = gql`
  {
    persons {
      id
      firstName
      lastName
      type
      generationId
    }
  }
`;

export const GET_ALL_TEACHERS = gql`
  {
    teachers {
      id
      firstName
      lastName
      type
    }
  }
`;

export const GET_ALL_STUDENTS = gql`
  {
    students {
      id
      firstName
      lastName
      type
      generationId
    }
  }
`;

export const GET_ALL_QUOTES = gql`
  {
    persons {
      id
      firstName
      lastName
      personInformation {
        quote
      }
    }
  }
`;

export const GET_ALL_TEACHERS_CLIENT = gql`
  {
    teachers {
      id
      firstName
      lastName

      personInformation {
        bio
        socialMedias {
          id
          platform
          url
        }
      }
    }
  }
`;

export const GET_TEACHER_BY_ID = gql`
  query getTeacherById($id: Int!) {
    person(id: $id) {
      id
      firstName
      lastName

      personInformation {
        bio
        socialMedias {
          id
          platform
          url
        }
        quote
      }
    }
  }
`;

/**
 * Mutations
 */

export const CREATE_PERSON = gql`
  mutation createPerson($input: CreatePersonInput!) {
    createPerson(createPersonInput: $input) {
      id
      firstName
      lastName
      type
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation removePerson($id: Int!) {
    removePerson(id: $id) {
      id
      firstName
    }
  }
`;
