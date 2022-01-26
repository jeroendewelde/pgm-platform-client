import { gql, useQuery, useLazyQuery } from "@apollo/client";

export const GET_ALL_GENERATIONS = gql`
  {
    generations {
      id
      years
      name
    }
  }
`;
