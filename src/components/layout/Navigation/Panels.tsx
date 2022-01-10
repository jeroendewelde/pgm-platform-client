import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Transition
const transition = {
  duration: 0.8,
  ease: [0.6, -0.05, 0.01, 0.9],
};

interface ContainerProps {
  panel: boolean;
}

const Container = styled.div<ContainerProps>`
  .left__panel,
  .right__panel {
    position: absolute;
    height: 100vh;
    width: 50vw;
    z-index: 11;
    background-color: ${({ panel }) =>
      panel
        ? (props) => props.theme.colors.white
        : (props) => props.theme.colors.white};
  }

  .right__panel {
    right: 0;
    background-color: ${({ panel }) =>
      panel
        ? (props) => props.theme.colors.white
        : (props) => props.theme.colors.white};
  }
`;

const Panels = () => {
  const [panelComplete, setPanelComplete] = useState(false);
  return (
    <Container panel={panelComplete}>
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [null, 0, 0],
        }}
        exit={{
          height: [0, window.innerHeight, 0],
          top: [null, 0, 0],
        }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className="left__panel"
      ></motion.div>
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [0, 0, window.innerHeight],
        }}
        exit={{
          height: [0, window.innerHeight, 0],
          bottom: [null, 0, 0],
        }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className="right__panel"
        onAnimationComplete={() => {
          setPanelComplete(!panelComplete);
        }}
      ></motion.div>
    </Container>
  );
};

export default Panels;
