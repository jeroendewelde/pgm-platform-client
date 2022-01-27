import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, EffectCoverflow } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { TeacherCard } from "../Teacher";
import { AllTeachersClient } from "../../../interfaces";
import { motion } from "framer-motion";

SwiperCore.use([EffectCoverflow, Navigation, Autoplay]);

const SwiperContainer = styled(motion.div)`
  margin: 0 auto;
  margin-bottom: 5rem;

  max-width: 100rem;
  width: 100%;

  .swiper-slide {
    filter: blur(4px);
    background-color: ${(props) =>
      transparentize(0.7, props.theme.colors.purple)};
    pointer-events: none;
  }

  .swiper-slide-active {
    filter: blur(0);
    background: transparent;
    pointer-events: all;
  }

  .swiper-slide,
  .swiper-slide-active {
    max-width: 50rem;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => transparentize(0.7, props.theme.colors.red)};
    transform: translateY(50%);
    bottom: 50%;
    right: 1rem;
    top: auto;
    border: 2px solid ${(props) => props.theme.colors.red};
    height: 4rem;
    width: 4rem;
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
    z-index: 5;
  }

  .swiper-button-prev {
    right: auto;
    left: 1rem;
  }
`;

interface TeachersCarouselProps {
  teachers: AllTeachersClient[];
}

const TeachersCarousel = ({ teachers }: TeachersCarouselProps) => {
  return (
    <SwiperContainer
      initial={{
        opacity: 0,

        y: 100,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,

        y: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        delay: 1.2,
      }}
    >
      <Swiper
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        navigation={true}
        loop={true}
        className="mySwiper"
      >
        {teachers.map((teacher) => (
          <SwiperSlide key={teacher.id}>
            <TeacherCard
              id={teacher.id}
              bio={teacher.personInformation.bio}
              firstName={teacher.firstName}
              lastName={teacher.lastName}
              socialMedia={teacher.personInformation.socialMedias}
              avatarUrl={teacher.avatarUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default TeachersCarousel;
