import ReactPlayer from "react-player/youtube";

import client from "../../apollo-client";
import {
  Companies,
  CTACards,
  Hero,
  PraktischeInfo,
  TestimonialsCarousel,
  VeelgesteldeVragen,
} from "../components/Home";
import { Company, Testimonial } from "../../interfaces";
import { GET_ALL_TESTIMONIALS } from "../../graphql/testimonials";
import { GET_ALL_COMPANIES_CLIENT } from "../../graphql/companies";
import { H2 } from "../components/Titles/H2";
import { LinkButton } from "../components/Button";

interface HomeProps {
  testimonials: Testimonial[];
  companies: Company[];
}

export default function Home({ testimonials, companies }: HomeProps) {
  return (
    <>
      <Hero />

      <CTACards />

      <PraktischeInfo />

      <Companies companies={companies} />

      <TestimonialsCarousel testimonials={testimonials} />

      <VeelgesteldeVragen />
    </>
  );
}

export async function getStaticProps() {
  const queryMultiple = async () => {
    const query_Testimonials = await client.query({
      query: GET_ALL_TESTIMONIALS,
    });

    const query_Leerbedrijven = await client.query({
      query: GET_ALL_COMPANIES_CLIENT,
    });

    return [query_Testimonials, query_Leerbedrijven];
  };

  const [query_Testimonials, query_Leerbedrijven] = await queryMultiple();

  const {
    data: data_Testimonials,
    error: error_Testimonials,
    loading: loading_Testimonials,
  } = query_Testimonials;
  const {
    data: data_Leerbedrijven,
    error: error_Leerbedrijven,
    loading: loading_Leerbedrijven,
  } = query_Leerbedrijven;

  return {
    props: {
      testimonials: data_Testimonials.testimonials,
      companies: data_Leerbedrijven.companies,
    },
  };
}
