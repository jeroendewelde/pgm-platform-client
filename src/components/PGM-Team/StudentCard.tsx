import Image from "next/image";
import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";

import teacher from "../../assets/test/teacher.png";

const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;
  width: 7rem;
  margin-bottom: 3rem;

  @media (min-width: ${(props) => props.theme.width.small}) {
    margin: 0 1rem;
    width: 10rem;
    margin-bottom: 3rem;
  }

  .name {
    font-family: ${(props) => props.theme.fontFamilies.primary};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    text-align: center;
    margin-top: 1rem;
    font-size: ${(props) => props.theme.fontSizes.normal};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 7rem;
  height: 7rem;
  border: 2px solid ${(props) => props.theme.colors.purple};
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.bg_gradient_color_2)};
  border-radius: 50%;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.width.small}) {
    width: 10rem;
    height: 10rem;
  }
`;

export interface StudentCardProps {
  name: string;
}

const StudentCard = ({ name }: StudentCardProps) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={teacher} layout="fill" alt="teacher" objectFit="contain" />
      </ImageContainer>

      <span className="name">{name}</span>
    </Container>
  );
};

export default StudentCard;
