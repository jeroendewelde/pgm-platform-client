import ReactPlayer from "react-player/youtube";

import client from "../../apollo-client";
import { Hero, TestimonialsCarousel } from "../components/Home";
import { Testimonial } from "../../interfaces";
import { GET_ALL_TESTIMONIALS } from "../../graphql/testimonials";
import styled from "styled-components";

const AudioPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
  margin-top: 3rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-top: 15rem;
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
}

export default function Home({ testimonials }: HomeProps) {
  return (
    <>
      <Hero />
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
