import { motion } from "framer-motion";
import Link from "next/link";
import React, { useContext } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { CursorContext } from "../../context/CursorContext";
import useInViewObserver from "../../hooks/useInView";
import { GlitchTitle } from "../Titles/GlitchTitle";
import Campus from "./Campus";

const Container = styled(motion.section)`
  margin-top: calc(50vh + 2rem);

  @media (min-width: ${(props) => props.theme.width.small}) {
    margin-top: 80vh;
  }
`;

const FlexContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.width.small}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Content = styled.div``;

const AddressInfo = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.width.small}) {
    flex-direction: column;
    justify-content: flex-start;
    min-width: 30%;
    margin-left: 2rem;
  }
  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-left: 8rem;
  }

  .Contact {
    @media (min-width: ${(props) => props.theme.width.small}) {
      margin-top: 2rem;
    }

    a {
      font-family: ${(props) => props.theme.fontFamilies.primary};
      transition: ${(props) => props.theme.transition.normal};
      font-size: ${(props) => props.theme.fontSizes.small};

      @media (min-width: ${(props) => props.theme.width.esmall}) {
        font-size: ${(props) => props.theme.fontSizes.normal};
      }

      &:hover {
        color: ${(props) => props.theme.colors.turquoise};
      }
    }
  }

  .Address__title,
  .Contact__title {
    font-family: ${(props) => props.theme.fontFamilies.primary};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    display: block;
    font-size: ${(props) => props.theme.fontSizes.medium};
    color: ${(props) => props.theme.colors.turquoise};
  }

  span {
    display: block;
    font-size: ${(props) => props.theme.fontSizes.small};

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      font-size: ${(props) => props.theme.fontSizes.normal};
    }
  }
`;

const ContactInfo = () => {
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);
  const { setCursorHover } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setCursorHover(true);
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
  };

  return (
    <Container ref={ref} animate={animation}>
      <div className="h1_padding">
        <GlitchTitle>Contact</GlitchTitle>
      </div>
      <FlexContainer>
        <Content>
          <p>
            Onze opleidingen Bachelor Grafische en Digitale Media, Bachelor
            International Graphic and Digital Media en het Graduaat Programmeren
            vind je op onze mediacampus in Mariakerke. Met een eigen drukkerij,
            foto- en geluidsstudio en verschillende medialabs is deze campus
            helemaal op maat van de creatieve student. Vanaf het station
            Gent-Sint-Pieters en De Zuid zijn er rechtstreekse snelbussen naar
            de campus. Kom je liever met de wagen? Aan de campus zijn er
            voldoende parkeermogelijkheden. Maar ook via de fietssnelweg geraak
            je er snel.
          </p>
        </Content>
        <AddressInfo>
          <div className="Address">
            <span className="Address__title">Adres</span>
            <span>Industrieweg 232, </span>
            <span>9030 Gent (Mariakerke)</span>
          </div>
          <div className="Contact">
            <span className="Contact__title">Contact</span>
            <Link href="tel:092348600">
              <a
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                09 234 86 00
              </a>
            </Link>
          </div>
        </AddressInfo>
      </FlexContainer>
    </Container>
  );
};

export default ContactInfo;
