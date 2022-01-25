import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Transition
const transition = {
  duration: 0.8,
  ease: [0.6, -0.05, 0.01, 0.9],
};

const Container = styled.div`
  .panel_1,
  .panel_2 {
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 11;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const Panels = () => {
  return (
    <Container>
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
        transition={{ ...transition, duration: 1.2 }}
        className="panel_1"
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
        transition={{ ...transition, duration: 1.2 }}
        className="panel_2"
      ></motion.div>
    </Container>
  );
};

export default Panels;
