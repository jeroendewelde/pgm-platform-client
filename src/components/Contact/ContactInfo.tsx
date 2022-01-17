import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { GlitchTitle } from "../Titles/GlitchTitle";
import { H2 } from "../Titles/H2";

const Container = styled.section`
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

const ContactInfo = () => {
  return (
    <Container>
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
              <a>09 234 86 00</a>
            </Link>
          </div>
        </AddressInfo>
      </FlexContainer>
      <div>
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
              Bachelor Grafische en Digitale Media, Bachelor International
              Graphic and Digital Media en Graduaat Programmeren.
            </p>
            <p>
              De campus is vlot bereikbaar met het openbaar vervoer. Van de
              campus tot …
            </p>
            <ul>
              <li>Station Gent-Sint-Pieters: 15 minuten (snelbus)</li>
              <li>De Zuid (W. Wilsonplein): 19 minuten (snelbus)</li>
            </ul>
          </div>
        </CampusInfo>
      </div>
    </Container>
  );
};

export default ContactInfo;
