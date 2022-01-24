import ReactPlayer from "react-player/youtube";

import client from "../../apollo-client";
import { Companies, Hero, TestimonialsCarousel } from "../components/Home";
import { Company, Testimonial } from "../../interfaces";
import { GET_ALL_TESTIMONIALS } from "../../graphql/testimonials";
import styled from "styled-components";
import { GET_ALL_COMPANIES_CLIENT } from "../../graphql/companies";

const AudioPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
  margin: 5rem 0;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 8rem auto;
  }

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: ${(props) => props.theme.borderRadius.normal};
    overflow: hidden;
  }
`;

interface HomeProps {
  testimonials: Testimonial[];
  companies: Company[];
}

export default function Home({ testimonials, companies }: HomeProps) {
  return (
    <>
      <Hero />
      <Companies companies={companies} />

      <AudioPlayerWrapper>
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          controls
          url="https://www.youtube.com/watch?v=oZE6MQnM0cQ&t=5s"
        />
      </AudioPlayerWrapper>
      <TestimonialsCarousel testimonials={testimonials} />
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
