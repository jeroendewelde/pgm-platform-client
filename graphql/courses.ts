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
        name
        color
      }
      specialisation {
        id
        name
      }
    }
  }
`;

export const GET_COURSESBY_LEARNINGLINE_ID = gql`
  query coursesByLearningLineId($learningLineId: Int!) {
    coursesByLearningLineId(learningLineId: $learningLineId) {
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
        name
        color
      }
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query getCourseById($id: Int!) {
    course(id: $id) {
      id
      name
      description
      term
      academicYear
      tags
      teaserImage
      learningLineId
      specialisationId
      learningLine {
        id
        name
        color
      }
      projects {
        id
        name
        teaserText
        tags
        students {
          id
          firstName
          lastName
        }
      }
      teachers {
        id
        firstName
        lastName
        type
      }
    }
  }
`;

/**
 * Mutations
 */

export const CREATE_COURSE = gql`
  mutation createCourse($input: CreateCourseInput!) {
    createCourse(createCourseInput: $input) {
      id
      name
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse($input: UpdateCourseInput!, $id: Int!) {
    updateCourse(updateCourseInput: $input, id: $id) {
      id
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: Int!) {
    removeCourse(id: $id) {
      name
    }
  }
`;

export const GET_COURSE_BY_ID_client = gql`
  query getCourseById($id: Int!) {
    course(id: $id) {
      id
      name
      description
      term
      academicYear
      tags
      learningLineId
      specialisationId
      teaserImage
      learningLine {
        id
        name
        color
      }
      projects {
        id
        name
        teaserText
        teaserImage
        tags
        students {
          id
          firstName
          lastName
        }
      }
      teachers {
        id
        firstName
        lastName
        type

        personInformation {
          bio
          socialMedias {
            platform
            url
          }
        }
      }
    }
  }
`;
