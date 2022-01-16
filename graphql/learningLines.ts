import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Learning Line related queries
 */

/**
 * Queries
 */

export const GET_ALL_LEARNING_LINES = gql`
  {
    learningLines {
      id
      name
      color
    }
  }
`;

export const GET_LEARNING_LINE_BY_ID = gql`
  query getLearningLineById($id: Int!) {
    learningLine(id: $id) {
      id
      name
      color
    }
  }
`;

/**
 * Mutations
 */

export const CREATE_LEARNING_LINE = gql`
  mutation createLearningLine($input: CreateLearningLineInput!) {
    createLearningLine(createLearningLineInput: $input) {
      id
      name
      color
    }
  }
`;

export const UPDATE_LEARNING_LINE = gql`
  mutation updateLearningLine($input: UpdateLearningLineInput!, $id: Int!) {
    updateLearningLine(updateLearningLineInput: $input, id: $id) {
      id
      name
      color
    }
  }
`;

export const DELETE_LEARNING_LINE = gql`
  mutation deleteLearningLine($id: Int!) {
    removeLearningLine(id: $id) {
      name
    }
  }
`;
