import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import useInViewObserver from "../../hooks/useInView";
import { H2 } from "../Titles/H2";

const Container = styled(motion.section)`
  p {
    margin-bottom: 3rem;
    margin-top: 1rem;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    p {
      margin-bottom: 0;
      margin-top: 3rem;
    }
  }
`;

interface BioProps {
  bio: string;
}

const Bio = ({ bio }: BioProps) => {
  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.3,
        },
      });
    }

    if (!inView) {
      animation.start({
        opacity: 0,
        x: -100,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.3,
        },
      });
    }
  }, [animation, inView]);

  return (
    <Container ref={ref} animate={animation}>
      <H2>Biography</H2>
      <p>{bio}</p>
    </Container>
  );
};

export default Bio;
