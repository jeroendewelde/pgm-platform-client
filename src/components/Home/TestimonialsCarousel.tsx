import styled from "styled-components";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Testimonial } from "../../../interfaces";
import { Quote } from "../Quote";
import { H2 } from "../Titles/H2";

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

interface TestimonialProps {
  testimonials: Testimonial[];
}

const TestimonialsCarousel = ({ testimonials }: TestimonialProps) => {
  SwiperCore.use([Navigation, Autoplay]);

  return (
    <SwiperContainer>
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
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
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
    </SwiperContainer>
  );
};

export default TestimonialsCarousel;
