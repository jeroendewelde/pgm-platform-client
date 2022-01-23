import Image from "next/image";
import React from "react";
import styled from "styled-components";

import { Project } from "../../../interfaces";
import { GlitchTitle } from "../Titles/GlitchTitle";

import profileImage from "../../assets/test/profile.jpg";
import test from "../../assets/test/test.jpg";
import Terminal from "./Terminal";

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
      <GlitchTitle>{project.name}</GlitchTitle>
      <div className="students">
        {project.students.map((student) => (
          <div className="student">
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
      </div>

      <FlexContainer>
        <div className="image-container">
          <Image src={test} layout="fill" objectFit="cover" />
        </div>

        <Terminal project={project} />
      </FlexContainer>
    </Container>
  );
};

export default HeroDetail;
