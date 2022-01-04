import Image from "next/image";
import React from "react";
import styled from "styled-components";

import Tag from "./Tag";
import test from "../../assets/test/test.jpg";
import profile from "../../assets/test/profile.jpg";
import { transparentize } from "polished";

const Container = styled.div`
  cursor: pointer;
  width: 18rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.normal};
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.turquoise)};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px dashed ${(props) => props.theme.colors.turquoise};
  transition: ${(props) => props.theme.transition.normal};

  &:hover {
    border: 1px dashed ${(props) => props.theme.colors.white};
    background-color: ${(props) =>
      transparentize(0.2, props.theme.colors.turquoise)};
    box-shadow: ${(props) =>
      `0 0 20px ${transparentize(
        0.5,
        props.theme.colors.turquoise
      )}, 0 0 40px ${transparentize(
        0.6,
        props.theme.colors.turquoise
      )}, 0 0 80px ${transparentize(0.8, props.theme.colors.turquoise)}`};
    transform: translateY(-2px);
  }
`;

const CardImage = styled.div`
  padding: 0.5rem;
  position: relative;
  height: 10.125rem;
  width: 100%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  min-height: 8rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;

  img {
    border-radius: ${(props) => props.theme.borderRadius.circle};
  }
`;

const Student = styled.div`
  display: flex;
  align-items: center;

  span {
    display: block;
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
`;

export interface CardProps {}

const Card = () => {
  return (
    <Container>
      <CardImage>
        <Image src={test} layout="fill" alt="project-1" />
        <Tag title="Programmeren 1" learningLine={"blue"} />
        <Tag title="Programmeren 1" learningLine={"blue"} />
      </CardImage>
      <CardContent>
        <h3>Opdracht naam</h3>
        <Student>
          <ImageContainer>
            <Image src={profile} layout="fill" alt="project-1" />
          </ImageContainer>
          <div>
            <span>Jamie-Lee Hart</span>
            <small>2nd generation | 2020 - 2021</small>
          </div>
        </Student>
      </CardContent>
    </Container>
  );
};

export default Card;
