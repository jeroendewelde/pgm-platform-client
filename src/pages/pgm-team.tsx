import React from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { StudentCard } from "../components/Student";
import { TeacherCard } from "../components/Teacher";
import { GlitchTitle } from "../components/Titles/GlitchTitle";

const SwiperContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 5rem;

  max-width: 50rem;
  width: 100%;

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

const PgmTeam = () => {
  return (
    <>
      <GlitchTitle>Docenten</GlitchTitle>
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
          <SwiperSlide>
            <TeacherCard
              url=""
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
              name="Valerie De Bruycker"
              socialMedia={[
                { name: "Facebook", url: "https://www.facebook.com/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
                { name: "Github", url: "https://www.github.com/" },
                { name: "LinkedIn", url: "https://www.linkedin.com/" },
              ]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TeacherCard
              url=""
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
              name="Valerie De Bruycker"
              socialMedia={[
                { name: "Facebook", url: "https://www.facebook.com/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
                { name: "Github", url: "https://www.github.com/" },
                { name: "LinkedIn", url: "https://www.linkedin.com/" },
              ]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TeacherCard
              url=""
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
              name="Valerie De Bruycker"
              socialMedia={[
                { name: "Facebook", url: "https://www.facebook.com/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
                { name: "Github", url: "https://www.github.com/" },
                { name: "LinkedIn", url: "https://www.linkedin.com/" },
              ]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TeacherCard
              url=""
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
              name="Valerie De Bruycker"
              socialMedia={[
                { name: "Facebook", url: "https://www.facebook.com/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
                { name: "Github", url: "https://www.github.com/" },
                { name: "LinkedIn", url: "https://www.linkedin.com/" },
              ]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TeacherCard
              url=""
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
              name="Valerie De Bruycker"
              socialMedia={[
                { name: "Facebook", url: "https://www.facebook.com/" },
                { name: "Instagram", url: "https://www.instagram.com/" },
                { name: "Github", url: "https://www.github.com/" },
                { name: "LinkedIn", url: "https://www.linkedin.com/" },
              ]}
            />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>
      <GlitchTitle>Studenten</GlitchTitle>
      <StudentCard name="John Doe" />
    </>
  );
};

export default PgmTeam;
