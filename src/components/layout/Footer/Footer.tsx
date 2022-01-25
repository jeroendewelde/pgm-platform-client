import Image from "next/image";
import React, { useContext } from "react";
import styled from "styled-components";
import { CursorContext } from "../../../context/CursorContext";

import FooterContent from "./FooterContent";
import FooterCopyrightYear from "./FooterCopyrightYear";

const FooterStyle = styled.footer`
  position: relative;
  overflow: hidden;
`;
const GlowSpot = styled.div`
  position: absolute;
  top: -90%;
  right: -50%;
  z-index: -1;
`;

export interface FooterProps {}

const Footer = () => {
  const { setCursorHover } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setCursorHover(true);
    //change z-index of the card to be on top of the other cursor
    const element = document.querySelector(".cursor") as HTMLElement;
    if (element !== null) {
      element.style.zIndex = "0";
    }
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
    const element = document.querySelector(".cursor") as HTMLElement;

    if (element !== null) {
      element.style.zIndex = "11";
    }
  };

  return (
    <FooterStyle
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FooterContent />
      <FooterCopyrightYear />
      <GlowSpot>
        <Image
          src="/glow-spots-and-grid/glowspot-purple.png"
          width={2300}
          height={2300}
        />
      </GlowSpot>
    </FooterStyle>
  );
};

export default Footer;
