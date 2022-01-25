import Image from "next/image";
import Link from "next/link";
import { transparentize } from "polished";
import React, { useContext } from "react";
import styled from "styled-components";
import { CursorContext } from "../../../context/CursorContext";

const Container = styled.div`
  padding: 2rem 1rem;
  background-color: ${(props) =>
    transparentize(0.97, props.theme.colors.white)};
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  z-index: 16;
  position: relative;
`;

const Info = styled.div`
  margin-bottom: 1.5rem;

  span {
    display: block;
    margin: 0.5rem auto;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.normal};

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
    color: ${(props) => props.theme.colors.white};
    transition: ${(props) => props.theme.transition.normal};

    &:hover {
      color: ${(props) => props.theme.colors.turquoise};
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
  const { setCursorHover } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setCursorHover(true);
    //change z-index of the card to be on top of the other cursor
    const element = document.querySelector(".cursor") as HTMLElement;
    if (element !== null) {
      element.style.zIndex = "0";
      element.style.width = "15rem";
      element.style.height = "15rem";
      element.style.top = "-6.5rem";
      element.style.left = "-6rem";
      element.style.borderWidth = "1rem";
      element.style.transition = "all 0.2s ease-in-out";
    }
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
    const element = document.querySelector(".cursor") as HTMLElement;

    if (element !== null) {
      element.style.zIndex = "11";
      element.style.width = "2.5rem";
      element.style.height = "2.5rem";
      element.style.top = "auto";
      element.style.left = "auto";
      element.style.borderWidth = "3px";
    }
  };

  return (
    <Container>
      <Info>
        <span>
          © www.pgm.gent is een website van de opleiding Graduaat Programmeren
          van{" "}
          <Link href="https://www.arteveldehogeschool.be/">
            Arteveldehogeschool
          </Link>
          .
        </span>
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
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link href="https://www.facebook.com/Programmeren.ahs">
              Facebook
            </Link>
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link href="https://www.instagram.com/arteveldehogeschool/">
              Instagram
            </Link>
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link href="https://www.linkedin.com/company/graduaat-programmeren/">
              LinkedIn
            </Link>
          </li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link href="https://www.youtube.com/channel/UCHly8VZULSMWEmvbPJNVtFA/videos">
              YouTube
            </Link>
          </li>
        </SocialMedia>
      </FlexContainer>
      <LogoContainer>
        <Link href="/">
          <div>
            <Image src="/logo/logo.png" layout="fill" />
          </div>
        </Link>
      </LogoContainer>
    </Container>
  );
};

export default FooterContent;
