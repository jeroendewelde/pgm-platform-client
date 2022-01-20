import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import client from "../../apollo-client";
import { Button } from "../components/Button";
import { GlitchTitle } from "../components/Titles/GlitchTitle";
import { CourseTitle } from "../components/Titles/CourseTitle";
import { Card, CourseList } from "../components/Course";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Quote } from "../components/Quote";
import { TeacherImage } from "../components/Teacher";

import { Hero } from "../components/Home";
import { AllQuotes } from "../../interfaces";
import { GET_ALL_QUOTES } from "../../graphql/persons";

const SwiperContainer = styled.div`
  margin: 5rem auto;

  max-width: 50rem;
  width: 100%;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-top: 20rem;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${(props) => props.theme.colors.red};
    bottom: 0;
    left: calc(50% + 1rem);
    top: auto;
    transform: translateY(-50%);
    border: 2px solid ${(props) => props.theme.colors.red};
    height: 2rem;
    width: 2rem;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0 0 5px ${(props) => props.theme.colors.red},
      0 0 10px ${(props) => props.theme.colors.red};

    &::after {
      font-size: ${(props) => props.theme.fontSizes.normal};
      font-weight: ${(props) => props.theme.fontWeights.bold};
    }
  }

  .swiper-button-prev {
    left: auto;
    right: calc(50% + 1rem);
  }
`;

interface HomeProps {
  quotes: AllQuotes[];
}

export default function Home({ quotes }: HomeProps) {
  SwiperCore.use([Navigation, Autoplay]);

  return (
    <>
      <Hero />
      <SwiperContainer>
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={true}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {quotes.map((quote) => (
            <SwiperSlide key={quote.id}>
              <Quote
                source={quote.firstName + " " + quote.lastName}
                content={quote.personInformation.quote}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
      {/* 
        <GlitchTitle>Haalloo</GlitchTitle>
        <TeacherImage />
        <CourseTitle learningLine={"green"}>Computer Systems</CourseTitle>
        <Text>
          <Card tags={tags} title="computer systems" learningLine="red" />
          <Card tags={tags} title="computer systems" learningLine="green" />
          <Card tags={tags} title="computer systems" learningLine="blue" />
          <Card title="computer systems" learningLine="pink" />
        </Text>
        <CourseList />

        <Button variant="primary"> Hello </Button>

        <Quote
          source={"Phillipe De Pauw"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
        /> */}
      {/* <CourseList courses={courses} /> */}
    </>
  );
}

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: GET_ALL_QUOTES,
  });

  if (error) {
    console.log(error);
  }

  return {
    props: {
      quotes: data.persons,
    },
  };
}
