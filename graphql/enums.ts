import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Enum related queries
 */

/**
 * Queries
 */

export const GET_ALL_PERSON_TYPES = gql`
query {
  __type(name: "PersonType") {
    name
    enumValues {
      name
    }
  }
}`;
