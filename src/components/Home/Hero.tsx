import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { GlitchTitle } from "../Titles/GlitchTitle";
import heroImage from "../../assets/hero-image.png";

const Container = styled.div`
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

const Grid = styled.div`
  position: absolute;
  z-index: -2;
  right: 0;
  top: 20%;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    right: 20%;
    top: 100%;
  }
`;

const Hero = () => {
  return (
    <Container>
      <Content>
        <GlitchTitle>Graduaat programmeren </GlitchTitle>
        <div>
          <p>
            Droom je ervan om zelf knappe websites en coole apps te ontwikkelen
            met performante code en nette graphics? We leiden je op tot
            front-end developer, CMS Themer of full-stack JavaScript developer.
            Je wordt een programmeur gespecialiseerd in JavaScript, maar ook in
            HTML, CSS, UI/UX, software engineering …
          </p>
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
      <Grid>
        <Image
          src="/glow-spots-and-grid/grid-purple.svg"
          alt="grid"
          width={150}
          height={150}
        />
      </Grid>
    </Container>
  );
};

export default Hero;
