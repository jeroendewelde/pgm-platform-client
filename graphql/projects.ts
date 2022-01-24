import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Project related queries
 */

/**
 * Queries
 */

export const GET_ALL_PROJECTS = gql`
  {
    projects {
      id
      name
      teaserText
      body
      academicYear
      tags
      courseId
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!) {
    project(id: $id) {
      id
      name
      teaserText
      body
      academicYear
      tags
      courseId
      course {
        name
      }
      students {
        id
        firstName
        lastName
        academicYear
      }
    }
  }
`;

/**
 * Mutations
 */

export const CREATE_PROJECT = gql`
  mutation createProject($input: CreateProjectInput!) {
    createProject(createProjectInput: $input) {
      id
      name
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($input: UpdateProjectInput!, $id: Int!) {
    updateProject(updateProjectInput: $input, id: $id) {
      id
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Int!) {
    removeProject(id: $id) {
      name
    }
  }
`;
