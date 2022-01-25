import ReactPlayer from "react-player/youtube";

import client from "../../apollo-client";
import {
  Card,
  Companies,
  Hero,
  TestimonialsCarousel,
} from "../components/Home";
import { Company, Testimonial } from "../../interfaces";
import { GET_ALL_TESTIMONIALS } from "../../graphql/testimonials";
import styled from "styled-components";
import { GET_ALL_COMPANIES_CLIENT } from "../../graphql/companies";
import { H2 } from "../components/Titles/H2";
import { LinkButton } from "../components/Button";

const CTACards = styled.div`
  margin-top: 5rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-top: 10rem;
  }

  .cards-list {
    width: 100%;

    @media (min-width: ${(props) => props.theme.width.small}) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
  }
`;

const VideoPlayerContainer = styled.div`
  margin: 5rem 0;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 8rem auto;
  }

  /* @media (min-width: ${(props) => props.theme.width.elarge}) {
    padding: 0 10rem;
  } */

  .text {
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
  }
`;

const VideoPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
  margin: 2rem auto;

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
  const data = [
    {
      id: 1,
      title: "Opleidingsprogramma",
      text: "Ontdek hier het studieprogramma voor academiejaar 2022-2023",
      url: "https://www.pgm.gent/info/",
    },
    {
      id: 2,
      title: "Opleidingsbrochure",
      text: "Ontvang je opleidingsbrochure via mail - Academiejaar 2022-2023",
      url: "https://forms.summit.nl/Artevelde/BrochureAanvraagDigitaal/1b5d2211-96fc-4f2e-999b-9414b617413d/started#/Page/0",
    },
    {
      id: 3,
      title: "Begeleiding op maat",
      text: "Wil je extra advies over studiekeuze, studiefinanciering, trajecten op maat,...",
      url: "https://www.arteveldehogeschool.be/bij-ons-studeren/begeleiding-op-maat",
    },
  ];

  return (
    <>
      <Hero />

      <CTACards>
        <ul className="cards-list">
          {data.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              text={item.text}
              url={item.url}
            />
          ))}
        </ul>
      </CTACards>

      <VideoPlayerContainer>
        <H2>Praktische info</H2>
        <div>
          <p className="text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            assumenda delectus accusantium debitis. Labore voluptate nemo sed
            corporis, voluptatem, soluta culpa, incidunt porro voluptatum
            nesciunt atque vitae impedit qui consequatur? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Illum assumenda delectus
            accusantium debitis. Labore voluptate nemo sed corporis, voluptatem,
            soluta culpa, incidunt porro voluptatum nesciunt atque vitae impedit
            qui consequatur?
          </p>
          <LinkButton
            variant="secondary"
            href={
              "https://www.arteveldehogeschool.be/opleidingen/graduaat/programmeren/vragen-stel-ze"
            }
          >
            Meer info over studiemateriaal vind je hier
          </LinkButton>
        </div>
        <VideoPlayerWrapper>
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            controls
            url="https://www.youtube.com/watch?v=oZE6MQnM0cQ&t=5s"
          />
        </VideoPlayerWrapper>
      </VideoPlayerContainer>
      <Companies companies={companies} />

      <TestimonialsCarousel testimonials={testimonials} />

      <VideoPlayerContainer>
        <H2>Veelgestelde vragen</H2>
        <div>
          <p className="text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            assumenda delectus accusantium debitis. Labore voluptate nemo sed
            corporis, voluptatem, soluta culpa, incidunt porro voluptatum
            nesciunt atque vitae impedit qui consequatur? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Illum assumenda delectus
            accusantium debitis. Labore voluptate nemo sed corporis, voluptatem,
            soluta culpa, incidunt porro voluptatum nesciunt atque vitae impedit
            qui consequatur?
          </p>
          <LinkButton
            variant="secondary"
            href={
              "https://www.arteveldehogeschool.be/opleidingen/graduaat/programmeren/vragen-stel-ze"
            }
          >
            Zit je met vragen? stel ze hier
          </LinkButton>
        </div>
        <VideoPlayerWrapper>
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            controls
            url="https://www.youtube.com/watch?v=DG1jVe9l1FM&t=99s"
          />
        </VideoPlayerWrapper>
      </VideoPlayerContainer>
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
