import Image from "next/image";
import React from "react";
import styled from "styled-components";

import FooterContent from "./FooterContent";
import FooterCopyrightYear from "./FooterCopyrightYear";
import glowSpot from "../../../assets/glow-spots/footer.png";

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
  return (
    <FooterStyle>
      <FooterContent />
      <FooterCopyrightYear />
      <GlowSpot>
        <Image src={glowSpot} width={2300} height={2300} />
      </GlowSpot>
    </FooterStyle>
  );
};

export default Footer;
