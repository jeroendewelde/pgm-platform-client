import styled from "styled-components";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { Company } from "../../../interfaces";
import { Card } from "../Interns";
import { H2 } from "../Titles/H2";
import { transparentize } from "polished";

const SwiperContainer = styled.div`
  margin: 5rem auto;
  border-bottom: 1px dashed ${(props) => props.theme.colors.turquoise};

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 5rem auto;

    border: none;
  }

  //max-width: 70rem;
  width: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: ${(props) => props.theme.colors.red};
    bottom: auto;
    right: 0;
    top: 2rem;
    border: 2px solid ${(props) => props.theme.colors.red};
    height: 2rem;
    width: 2rem;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow: inset 0 0 5px ${(props) => props.theme.colors.red},
      0 0 10px ${(props) => props.theme.colors.red}; */

    &::after {
      font-size: ${(props) => props.theme.fontSizes.normal};
      font-weight: ${(props) => props.theme.fontWeights.bold};
    }

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      top: 1.5rem;
    }
  }

  .swiper-button-prev {
    left: auto;
    right: 3rem;
  }

  .company-swiper {
    padding-top: 3rem;
  }

  .swiper-slide {
    border-top: 1px solid
      ${(props) => transparentize(0.5, props.theme.colors.purple)};
  }

  .section-title {
    p {
      margin-top: 1rem;

      p {
        margin-top: 2rem;
      }
    }
  }
`;

interface CompaniesProps {
  companies: Company[];
}

const Companies = ({ companies }: CompaniesProps) => {
  SwiperCore.use([Navigation]);

  return (
    <SwiperContainer>
      <div className="section-title">
        <H2>Leerbedrijven</H2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
          assumenda delectus accusantium debitis. Labore voluptate nemo sed
          corporis, voluptatem, soluta culpa, incidunt porro voluptatum nesciunt
          atque vitae impedit qui consequatur? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Illum assumenda delectus accusantium
          debitis. Labore voluptate nemo sed corporis, voluptatem, soluta culpa,
          incidunt porro voluptatum nesciunt atque vitae impedit qui
          consequatur?
        </p>
      </div>
      <Swiper
        navigation={true}
        spaceBetween={50}
        slidesPerView={1}
        className="company-swiper"
      >
        {companies.map((company) => (
          <SwiperSlide key={company.id}>
            <Card company={company} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default Companies;
