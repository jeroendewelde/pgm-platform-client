import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import { Project } from "../../../interfaces";
import test from "../../assets/test/test.jpg";
import useInViewObserver from "../../hooks/useInView";
import { H2 } from "../Titles/H2";

const Container = styled(motion.section)`
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .flex {
    @media (min-width: ${(props) => props.theme.width.large}) {
      display: flex;
      flex-direction: row;
    }

    .body {
      margin-top: 2rem;

      p {
        margin-top: 1rem;
        margin-bottom: 1rem;

        @media (min-width: ${(props) => props.theme.width.medium}) {
          margin-top: 0;
        }
      }
    }

    .image-container {
      position: relative;
      border-radius: ${(props) => props.theme.borderRadius.small};
      overflow: hidden;
      width: 100%;
      height: 17rem;
      margin-top: 2rem;

      @media (min-width: ${(props) => props.theme.width.esmall}) {
        width: 100%;
        height: 20rem;
      }
      @media (min-width: ${(props) => props.theme.width.small}) {
        width: 100%;
        height: 25rem;
      }
      @media (min-width: ${(props) => props.theme.width.medium}) {
        width: 100%;
        height: 40rem;
      }
      @media (min-width: ${(props) => props.theme.width.large}) {
        width: 100%;
        min-width: 35rem;
        height: 35rem;
        margin-left: 8rem;
      }
    }
  }
`;

interface ProjectContentProps {
  project: Project;
}

const ProjectContent = ({ project }: ProjectContentProps) => {
  const { ref, inView } = useInView();
  const animation = useInViewObserver(inView);
  return (
    <Container ref={ref} animate={animation}>
      <H2>Beschrijving</H2>
      <div className="flex">
        <div className="body">
          <p>{project.body}</p>
        </div>
        <div className="image-container">
          <Image src={test} layout="fill" objectFit="cover" />
        </div>
      </div>
    </Container>
  );
};

export default ProjectContent;
