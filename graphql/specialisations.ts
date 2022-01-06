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
 
 export const DELETE_SPECIALISATION = gql`
 mutation deleteSpecialisation($id: Int!) {
   removeSpecialisation(id: $id){
     id
     name
     academicYear
   }
 }`;