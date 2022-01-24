import styled from "styled-components";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { Company } from "../../../interfaces";
import { Card } from "../Interns";
import { H2 } from "../Titles/H2";

const SwiperContainer = styled.div`
  margin: 5rem auto;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-top: 15rem;
  }

  max-width: 70rem;
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

interface CompaniesProps {
  companies: Company[];
}

const Companies = ({ companies }: CompaniesProps) => {
  SwiperCore.use([Navigation]);

  return (
    <SwiperContainer>
      <H2>Leerbedrijven</H2>
      <Swiper navigation={true} spaceBetween={50} slidesPerView={1}>
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
