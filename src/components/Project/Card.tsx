import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import Tag from "./Tag";
import test from "../../assets/test/test.jpg";
import profile from "../../assets/test/profile.jpg";
import { Project } from "../../../interfaces";

const Container = styled.li`
  margin-bottom: 2rem;
  cursor: pointer;
  min-width: 15rem;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.small};
  height: 16rem;
  transition: ${(props) => props.theme.transition.bounce};

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    width: calc(50% - 1rem);
    height: 18rem;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    height: 25rem;
  }

  &:hover {
    transition: ${(props) => props.theme.transition.bounce};
    height: 22rem;

    @media (min-width: ${(props) => props.theme.width.esmall}) {
      height: 24rem;
    }
    @media (min-width: ${(props) => props.theme.width.medium}) {
      height: 30rem;
    }

    .card-content {
      transition: ${(props) => props.theme.transition.bounce};
      transform: translateY(0%);
    }
  }

  .card-content {
    transform: translateY(-100%);
    margin: auto 0;
    transition: ${(props) => props.theme.transition.normal};
    padding: 0.5rem;
    position: relative;
    border: 1px dashed ${(props) => props.theme.colors.turquoise};

    .students {
      transition: ${(props) => props.theme.transition.normal};
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-size: ${(props) => props.theme.fontSizes.small};
      font-family: ${(props) => props.theme.fontFamilies.secondary};
      font-weight: ${(props) => props.theme.fontWeights.light};
      span {
        margin-right: 0.5rem;
      }

      li {
        margin: 0;
        margin-right: 0.5rem;

        &:last-child ::after {
          content: "";
        }

        &::after {
          content: " &";
        }
      }
    }

    .teaser-text {
      font-size: ${(props) => props.theme.fontSizes.normal};
      margin: 0;
      margin-top: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
    }
  }
`;

const CardImage = styled.div`
  padding: 0.5rem;
  position: relative;
  height: 16rem;
  width: 100%;
  z-index: 2;

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    height: 18rem;
  }

  @media (min-width: ${(props) => props.theme.width.small}) {
    height: 18rem;
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    height: 25rem;
  }

  h3 {
    margin: 0;
    padding: 0.5rem;
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSizes.medium};
    letter-spacing: 1px;
    z-index: 3;
    position: absolute;
    bottom: 0rem;
    left: 0;
    width: 100%;
    background-color: ${(props) =>
      transparentize(0.4, props.theme.colors.purple)};
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
`;

export interface CardProps {
  key: number;
  project: Project;
}

const Card = ({ key, project }: CardProps) => {
  console.log(project);
  return (
    <Container key={key}>
      <CardImage>
        <Image src={test} layout="fill" alt="project-1" objectFit="cover" />
        <ul>
          {project.tags.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </ul>

        <h3>{project.name}</h3>
      </CardImage>
      <div className="card-content">
        <ul className="students">
          <span>Made by </span>
          {project.students.map((student, index) => (
            <li key={index}>{student.firstName}</li>
          ))}
        </ul>

        <p className="teaser-text">{project.teaserText}</p>
      </div>
    </Container>
  );
};

export default Card;
