import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import styled from "styled-components";
import { StudentCard } from ".";
import { transparentize } from "polished";
import { Person } from "../../../interfaces";

import useInViewObserver from "../../hooks/useInView";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

SwiperCore.use([Navigation, Autoplay]);

const SwiperContainer = styled(motion.div)`
  border-right: 2px solid ${(props) => props.theme.colors.turquoise};
  border-left: 2px solid ${(props) => props.theme.colors.turquoise};
  margin: 0 auto;
  margin-bottom: 5rem;

  max-width: 100rem;
  width: 100%;

  .swiper-slide,
  .swiper-slide-active {
    max-width: 20rem;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => transparentize(0.7, props.theme.colors.red)};
    bottom: 50%;
    right: 1rem;
    top: auto;
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
    z-index: 5;
  }

  .swiper-button-prev {
    right: auto;
    left: 1rem;
  }
`;

interface Props {
  students: Person[];
}

const StudentCarousel = ({ students }: Props) => {
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);
  return (
    <SwiperContainer ref={ref} animate={animation}>
      {students.length > 0 && (
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: true,
          }}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          navigation={true}
          loop={true}
        >
          {students.map((student) => (
            <SwiperSlide key={student.id}>
              <StudentCard name={`${student.firstName} ${student.lastName}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </SwiperContainer>
  );
};

export default StudentCarousel;
