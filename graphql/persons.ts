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

export const GET_PERSON_BY_ID = gql`
  query personById($id: Int!) {
    person(id: $id) {
      id
      firstName
      lastName
      type
    }
  }
`;

export const GET_PERSON_INFORMATION_BY_PERSON_ID = gql`
  query personInformationByPersonId($id: Int!) {
    personInformationByPersonId(id: $id) {
      id
      quote
      bio
      dob
      personId
    }
  }
`;

export const GET_FIELD_EXPERIENCES_BY_PERSON_ID = gql`
  query fieldExperiencesByPersonId($id: Int!) {
    fieldExperiencesByPersonId(id: $id) {
      id
      company
      description
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

/**
 * Mutations
 */

export const CREATE_PERSON = gql`
  mutation createPerson($input: CreatePersonInput!) {
    createPerson(createPersonInput: $input) {
      id
      firstName
    }
  }
`;

export const CREATE_PERSON_INFORMATION = gql`
  mutation createPersonInformation($input: CreatePersonInformationInput!) {
    createPersonInformation(createPersonInformationInput: $input) {
      id
    }
  }
`;

export const CREATE_FIELD_EXPERIENCE = gql`
  mutation createFieldExperience($input: CreateFieldExperienceInput!) {
    createFieldExperience(createFieldExperienceInput: $input) {
      id
    }
  }
`;

export const CREATE_SOCIAL_MEDIA = gql`
  mutation createSocialMedia($input: CreateSocialMediaInput!) {
    createSocialMedia(createSocialMediaInput: $input) {
      id
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation updatePerson($input: UpdatePersonInput!, $id: Int!) {
    updatePerson(updatePersonInput: $input, id: $id) {
      id
    }
  }
`;

export const UPDATE_PERSON_INFORMATION = gql`
  mutation updatePersonInformation(
    $input: UpdatePersonInformationInput!
    $id: Int!
  ) {
    updatePersonInformation(updatePersonInformationInput: $input, id: $id) {
      id
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation removePerson($id: Int!) {
    removePerson(id: $id) {
      firstName
    }
  }
`;
