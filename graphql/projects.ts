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
}`;

/**
 * Mutations
 */

 export const CREATE_PROJECT = gql`
 mutation createProject($input: CreateProjectInput!) {
  createProject(createProjectInput: $input){
     id
     name
   }
 }`;
 
 export const DELETE_PROJECT = gql`
 mutation deleteProject($id: Int!) {
   removeProject(id: $id){
     id
     name
   }
 }`;