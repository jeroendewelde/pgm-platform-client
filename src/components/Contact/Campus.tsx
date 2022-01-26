import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import useInViewObserver from "../../hooks/useInView";
import { H2 } from "../Titles/H2";

const CampusInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .Campus__info__content {
    p:first-child {
      margin-bottom: 1.5rem;
    }

    ul {
      list-style: outside;
      margin-left: 1.5rem;
      font-size: ${(props) => props.theme.fontSizes.normal};

      @media (min-width: ${(props) => props.theme.width.medium}) {
        font-size: ${(props) => props.theme.fontSizes.medium};
      }
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vw;
  margin-bottom: 2rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    min-width: 40%;
    height: 30rem;
    margin-bottom: 0;
    margin-right: 2rem;
  }
  @media (min-width: ${(props) => props.theme.width.large}) {
    margin-right: 8rem;
  }
`;

const Campus = () => {
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);
  return (
    <motion.div ref={ref} animate={animation}>
      <div className="h2_padding">
        <H2>Campus Mariakerke</H2>
      </div>
      <CampusInfo>
        <ImageContainer>
          <Image
            layout="fill"
            objectFit="cover"
            src="/campus.jpg"
            alt="Campus Mariakerke"
          />
        </ImageContainer>
        <div className="Campus__info__content">
          <p>
            We noemen campus Mariakerke ook wel eens de mediacampus van
            Arteveldehogeschool. Zo’n 1000 studenten volgen er de opleidingen
            Bachelor Grafische en Digitale Media, Bachelor International Graphic
            and Digital Media en Graduaat Programmeren.
          </p>
          <p>
            De campus is vlot bereikbaar met het openbaar vervoer. Van de campus
            tot …
          </p>
          <ul>
            <li>Station Gent-Sint-Pieters: 15 minuten (snelbus)</li>
            <li>De Zuid (W. Wilsonplein): 19 minuten (snelbus)</li>
          </ul>
        </div>
      </CampusInfo>
    </motion.div>
  );
};

export default Campus;
