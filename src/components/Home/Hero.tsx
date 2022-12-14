import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { GlitchTitle } from "../Titles/GlitchTitle";
import heroImage from "../../assets/hero-image.png";
import { LinkButton } from "../Button";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  width: 100%;
  order: 2;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: 50%;
    margin-right: 2rem;
    order: 0;
  }

  p {
    margin-bottom: 2rem;
    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 5rem;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    .absoluteContainer {
      position: absolute;
      top: -3rem;
      left: 0;
      width: 60rem;
      height: 100%;
      margin-bottom: 0rem;
    }
  }
`;

const GlowSpot = styled.div`
  position: absolute;
  top: 0%;
  right: 0%;
  z-index: -1;
  display: none;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: block;
    top: -100%;
    right: -80%;
  }
`;

const Hero = () => {
  return (
    <Container
      initial={{
        opacity: 0,
        y: -50,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        delay: 0.5,
      }}
    >
      <Content>
        <div className="h1_padding">
          <GlitchTitle>Graduaat programmeren </GlitchTitle>
        </div>
        <div>
          <p>
            Droom je ervan om zelf knappe websites en coole apps te ontwikkelen
            met performante code en nette graphics? We leiden je op tot
            front-end developer, CMS Themer of full-stack JavaScript developer.
            Je wordt een programmeur gespecialiseerd in JavaScript, maar ook in
            HTML, CSS, UI/UX, software engineering ???
          </p>
          <LinkButton
            variant="primary"
            href="https://www.arteveldehogeschool.be/inschrijven/inschrijven-voor-een-bachelor-graduaat-bachelor-na-bachelor/je-inschrijving/inschrijven-als-nieuwe-student"
          >
            Schrijf je online in
          </LinkButton>
        </div>
      </Content>
      <ImageContainer>
        <div className="absoluteContainer">
          <Image src={heroImage} alt="hero" />
        </div>
      </ImageContainer>
      <GlowSpot>
        <Image
          src="/glow-spots-and-grid/glowspot-purple.png"
          alt="glowspot"
          width={1500}
          height={1500}
        />
      </GlowSpot>
    </Container>
  );
};

export default Hero;
