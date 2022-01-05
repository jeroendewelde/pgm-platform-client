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
}`;


/**
 * Mutations
 */

 export const CREATE_SPECIALISATION = gql`
 mutation createSpecialisation($input: CreateSpecialisationInput!) {
  createSpecialisation(createSpecialisationInput: $input){
     id
     name
     academicYear
   }
 }`;
 
//  export const DELETE_LEARNING_LINE = gql`
//  mutation deleteLearningLine($id: Int!) {
//    removeLearningLine(id: $id){
//      id
//      name
//      color
//    }
//  }`;