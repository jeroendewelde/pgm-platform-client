import React, { ReactElement, useState } from "react";
import styledComponent from "styled-components";
import { motion } from "framer-motion";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { useMousePosition } from "../hooks/useMousePosition";
import { CursorContext } from "../context/CursorContext";

const Cursor = styledComponent(motion.div)`
  display: none;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: block;
    cursor: pointer;
    position: absolute;
    height: 2.5rem;
    width: 2.5rem;
    z-index: 11;
    top: 0;
    border: 3px solid ${(props) => props.theme.colors.pink};
    box-shadow: 0 0 20px ${(props) => props.theme.colors.pink},
      0 0 40px ${(props) => props.theme.colors.pink},
      0 0 80px ${(props) => props.theme.colors.pink},
      inset 0 0 15px ${(props) => props.theme.colors.pink};
    border-radius: 50%;
    pointer-events: none;
  }
`;

const MainLayout = styledComponent.main`
  max-width: ${(props) => props.theme.width.elarge};
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
  min-height: 95vh;
  @media (min-width: ${(props) => props.theme.width.medium}) {
    padding: 5rem 3rem;
  }
`;

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({
  children,
}: BaseLayoutProps): ReactElement {
  const [cursorHover, setCursorHover] = useState(false);
  const { x, y } = useMousePosition();

  return (
    <>
      <Cursor
        className="cursor"
        animate={{
          x: x - 20,
          y: y - 20,
          scale: cursorHover ? 3 : 0.5,
        }}
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
      />
      <CursorContext.Provider value={{ cursorHover, setCursorHover }}>
        <Header setCursorHover={setCursorHover} />
        <MainLayout>{children}</MainLayout>
      </CursorContext.Provider>
      <Footer />
    </>
  );
}

// export default BaseLayout;
