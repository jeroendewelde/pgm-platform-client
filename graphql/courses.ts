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

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: Int!) {
    removeCourse(id: $id) {
      id
      name
    }
  }
`;
