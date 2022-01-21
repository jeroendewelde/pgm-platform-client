import { gql, useQuery, useLazyQuery } from "@apollo/client";

/**
 * All Testimonial related queries
 */

/**
 * Queries
 */

export const GET_ALL_TESTIMONIALS = gql`
  {
    testimonials {
      id
      quote
      name
      company
    }
  }
`;

export const GET_TESTIMONIAL_BY_ID = gql`
  query getTestimonialById($id: Int!) {
    testimonial(id: $id) {
      id
      quote
      name
      company
    }
  }
`;

/**
 * Mutations
 */

export const CREATE_TESTIMONIAL = gql`
  mutation createTestimonial($input: CreateTestimonialInput!) {
    createTestimonial(createTestimonialInput: $input) {
      id
    }
  }
`;

export const UPDATE_TESTIMONIAL = gql`
  mutation updateTestimonial($input: UpdateTestimonialInput!, $id: Int!) {
    updateTestimonial(updateTestimonialInput: $input, id: $id) {
      id
    }
  }
`;

export const DELETE_TESTIMONIAL = gql`
  mutation deleteTestimonial($id: Int!) {
    removeTestimonial(id: $id) {
      name
    }
  }
`;
