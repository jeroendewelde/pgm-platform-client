import styled from "styled-components";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Testimonial } from "../../../interfaces";
import { Quote } from "../Quote";
import { H2 } from "../Titles/H2";
import { lighten, transparentize } from "polished";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useInViewObserver from "../../hooks/useInView";

const SwiperContainer = styled(motion.div)`
  margin: 0 auto;
  background-color: ${(props) =>
    lighten(0.05, props.theme.colors.bg_gradient_color_1)};
  width: 100%;
  padding: 5rem 2rem;
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => transparentize(0.8, props.theme.colors.white)};

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 8rem auto;
    padding: 10rem 2rem;
  }

  width: 100%;

  .container {
    max-width: 50rem;
    margin: 0 auto;
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

interface TestimonialProps {
  testimonials: Testimonial[];
}

const TestimonialsCarousel = ({ testimonials }: TestimonialProps) => {
  SwiperCore.use([Navigation, Autoplay]);
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);

  return (
    <SwiperContainer ref={ref} animate={animation}>
      <div className="container">
        <div className="h2_padding">
          <H2>Testimonials</H2>
        </div>
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={true}
          spaceBetween={50}
          slidesPerView={1}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Quote
                source={`${testimonial.name} ${
                  testimonial.company ? "[" + testimonial.company + "]" : ""
                }`}
                content={testimonial.quote}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SwiperContainer>
  );
};

export default TestimonialsCarousel;
