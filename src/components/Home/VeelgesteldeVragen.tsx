import { motion } from "framer-motion";
import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";

import { LinkButton } from "../Button";
import { H2 } from "../Titles/H2";
import useInViewObserver from "../../hooks/useInView";
import { useInView } from "react-intersection-observer";

const VideoPlayerContainer = styled(motion.div)`
  margin: 5rem 0;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 8rem auto;
  }

  /* @media (min-width: ${(props) => props.theme.width.elarge}) {
    padding: 0 10rem;
  } */

  .text {
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
  }
`;

const VideoPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */;
  margin: 2rem auto;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: ${(props) => props.theme.borderRadius.normal};
    overflow: hidden;
  }
`;

const VeelgesteldeVragen = () => {
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);
  return (
    <VideoPlayerContainer ref={ref} animate={animation}>
      <H2>Veelgestelde vragen</H2>
      <div>
        <p className="text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
          assumenda delectus accusantium debitis. Labore voluptate nemo sed
          corporis, voluptatem, soluta culpa, incidunt porro voluptatum nesciunt
          atque vitae impedit qui consequatur? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Illum assumenda delectus accusantium
          debitis. Labore voluptate nemo sed corporis, voluptatem, soluta culpa,
          incidunt porro voluptatum nesciunt atque vitae impedit qui
          consequatur?
        </p>
        <LinkButton
          variant="secondary"
          href={
            "https://www.arteveldehogeschool.be/opleidingen/graduaat/programmeren/vragen-stel-ze"
          }
        >
          Zit je met vragen? stel ze hier
        </LinkButton>
      </div>
      <VideoPlayerWrapper>
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          controls
          url="https://www.youtube.com/watch?v=DG1jVe9l1FM&t=99s"
        />
      </VideoPlayerWrapper>
    </VideoPlayerContainer>
  );
};

export default VeelgesteldeVragen;
