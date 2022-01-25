import Image from "next/image";
import React from "react";
import styled from "styled-components";

import { Project } from "../../../interfaces";
import { GlitchTitle } from "../Titles/GlitchTitle";

import profileImage from "../../assets/test/profile.jpg";
import test from "../../assets/test/test.jpg";
import Terminal from "./Terminal";
import { motion } from "framer-motion";

const Container = styled.section`
  .students {
    display: flex;
    flex-direction: column;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      flex-direction: row;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .student {
      display: none;

      @media (min-width: ${(props) => props.theme.width.esmall}) {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 1rem;
        margin-right: 2rem;
      }

      .image-container {
        position: relative;
        border-radius: ${(props) => props.theme.borderRadius.circle};
        overflow: hidden;
        width: 2rem;
        height: 2rem;
        margin-right: 1rem;

        @media (min-width: ${(props) => props.theme.width.esmall}) {
          width: 2.5rem;
          height: 2.5rem;
        }
      }

      .name {
        font-size: ${(props) => props.theme.fontSizes.normal};
        font-weight: ${(props) => props.theme.fontWeights.bold};
        display: block;
      }

      .year {
        display: block;
        margin-top: -0.1rem;
        font-size: ${(props) => props.theme.fontSizes.small};
        font-family: ${(props) => props.theme.fontFamilies.secondary};
      }
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.width.small}) {
    flex-direction: row;
    align-items: flex-start;
  }

  .image-container {
    order: 2;
    position: relative;
    border-radius: ${(props) => props.theme.borderRadius.small};
    overflow: hidden;
    width: 100%;
    height: 17rem;
    margin: 1rem 0;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      height: 25rem;
    }

    @media (min-width: ${(props) => props.theme.width.small}) {
      order: 0;
      height: 20rem;
      margin-right: 2rem;
    }
    @media (min-width: ${(props) => props.theme.width.medium}) {
      height: 25rem;
      margin-right: 4rem;
    }
  }
`;

interface HeroDetailProps {
  project: Project;
}

const HeroDetail = ({ project }: HeroDetailProps) => {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          delay: 0,
          duration: 0.65,
        }}
      >
        <GlitchTitle>{project.name}</GlitchTitle>
      </motion.div>
      <motion.div
        className="students"
        initial={{ opacity: 0, y: 10, zIndex: -1 }}
        animate={{ opacity: 1, y: 0, zIndex: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.7,
          duration: 0.45,
        }}
      >
        {project.students.map((student) => (
          <div className="student" key={student.id}>
            <div className="image-container">
              <Image src={profileImage} width={100} height={100} />
            </div>
            <div>
              <span className="name">
                {student.firstName + " " + student.lastName}
              </span>
              <span className="year">{student.academicYear}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <FlexContainer>
        <motion.div
          className="image-container"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            delay: 0.5,
            duration: 0.65,
          }}
        >
          <Image src={test} layout="fill" objectFit="cover" />
        </motion.div>

        <Terminal project={project} />
      </FlexContainer>
    </Container>
  );
};

export default HeroDetail;
