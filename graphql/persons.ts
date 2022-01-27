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
      academicYear
      avatarUrl
      personInformation {
        id
        quote
        bio
        dob
        fieldExperiences {
          id
          company
          function
        }
        socialMedias {
          id
          platform
          url
        }
      }
      courses {
        id
      }
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

export const GET_ALL_STUDENTS = gql`
  {
    students {
      id
      firstName
      lastName
      type
      academicYear
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
      avatarUrl

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
      avatarUrl

      courses {
        id
        name
        tags
        learningLine {
          color
        }
      }

      personInformation {
        bio
        socialMedias {
          id
          platform
          url
        }
        fieldExperiences {
          id
          company
          function
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
      lastName
      type
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
