import client from "../../apollo-client";

import { Hero, TestimonialsCarousel } from "../components/Home";
import { Testimonial } from "../../interfaces";
import { GET_ALL_TESTIMONIALS } from "../../graphql/testimonials";

interface HomeProps {
  testimonials: Testimonial[];
}

export default function Home({ testimonials }: HomeProps) {
  return (
    <>
      <Hero />
      <TestimonialsCarousel testimonials={testimonials} />
    </>
  );
}

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: GET_ALL_TESTIMONIALS,
  });

  if (error) {
    console.log(error);
  }

  return {
    props: {
      testimonials: data.testimonials,
    },
  };
}
