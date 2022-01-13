import Image from "next/image";
import Link from "next/link";
import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";

import logo from "../../../assets/logo/logo.png";

const Container = styled.div`
  padding: 2rem 1rem;
  background-color: ${(props) => transparentize(0.9, props.theme.colors.white)};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 16;
  position: relative;
`;

const Info = styled.div`
  margin-bottom: 1.5rem;

  p {
    margin: 0.5rem auto;
    text-align: center;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      max-width: 60rem;
      text-align: left;
    }
  }

  a {
    color: ${(props) => props.theme.colors.white};
    transition: ${(props) => props.theme.transition.normal};
    box-shadow: inset 0 -2px ${(props) => props.theme.colors.turquoise};

    &:hover {
      color: ${(props) => props.theme.colors.turquoise};
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 60rem;
    margin: 0 auto;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: block;
  }

  span {
    font-size: ${(props) => props.theme.fontSizes.normal};
  }

  a {
    display: block;
    color: ${(props) => props.theme.colors.white};
    transition: ${(props) => props.theme.transition.normal};
    word-break: break-all;

    &:hover {
      color: ${(props) => props.theme.colors.turquoise};
    }
  }
`;
const SocialMedia = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: block;
    min-width: 20rem;
  }

  li {
    margin: 0 0.5rem;
  }

  a {
    color: ${(props) => props.theme.colors.turquoise};
    transition: ${(props) => props.theme.transition.normal};

    &:hover {
      color: ${(props) => props.theme.colors.pink};
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 1rem 0;
  }

  div {
    position: relative;
    width: 9.72rem;
    height: 4rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      width: calc(9.72rem * 1.5);
      height: calc(4rem * 1.5);
    }
  }
`;

const FooterContent = () => {
  return (
    <Container>
      <Info>
        <p>
          © www.pgm.gent is een website van de opleiding Graduaat Programmeren
          van{" "}
          <Link href="https://www.arteveldehogeschool.be/">
            Arteveldehogeschool
          </Link>
          .
        </p>
      </Info>
      <FlexContainer>
        <ContactInfo>
          <span>Industrieweg 232, </span>
          <span>9030 Mariakerke (Gent)</span>
          <Link href="tel:+32 9 234 86 00">+32 9 234 86 00</Link>
          <Link href="mailto:info.programmeren@arteveldehs.be">
            info.programmeren@arteveldehs.be
          </Link>
          <span>Website made by PGM.GENT</span>
        </ContactInfo>
        <SocialMedia>
          <li>
            <Link href="https://www.facebook.com/Programmeren.ahs">
              Facebook
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/arteveldehogeschool/">
              Instagram
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/company/graduaat-programmeren/">
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/channel/UCHly8VZULSMWEmvbPJNVtFA/videos">
              YouTube
            </Link>
          </li>
        </SocialMedia>
      </FlexContainer>
      <LogoContainer>
        <Link href="/">
          <div>
            <Image src={logo} layout="fill" />
          </div>
        </Link>
      </LogoContainer>
    </Container>
  );
};

export default FooterContent;