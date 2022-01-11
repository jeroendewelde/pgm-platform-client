import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { useMousePosition } from "../hooks/useMousePosition";

const Cursor = styled(motion.div)`
  display: none;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: block;
    cursor: pointer;
    position: absolute;
    height: 2.5rem;
    width: 2.5rem;
    z-index: 11;
    top: 0;
    border: 2px solid ${(props) => props.theme.colors.purple};
    box-shadow: 0 0 20px ${(props) => props.theme.colors.purple},
      0 0 40px ${(props) => props.theme.colors.purple},
      inset 0 0 15px ${(props) => props.theme.colors.purple};
    border-radius: 50%;
    pointer-events: none;
  }
`;

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [cursorHover, setCursorHover] = useState(false);
  const { x, y } = useMousePosition();

  return (
    <>
      <Cursor
        animate={{
          x: x - 20,
          y: y - 20,
          scale: cursorHover ? 1.2 : 0.5,
          //opacity: cursorHover ? 1 : 0,
        }}
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
      />
      <Header setCursorHover={setCursorHover} />
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
