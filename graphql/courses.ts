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
      color
    }
  }
}`;


/**
 * Mutations
 */

 export const CREATE_COURSE = gql`
 mutation createCourse($input: CreateCourseInput!) {
  createCourse(createCourseInput: $input){
     id
     name
   }
 }`;
 
 export const DELETE_COURSE = gql`
 mutation deleteCourse($id: Int!) {
   removeCourse(id: $id){
     id
     name
   }
 }`;