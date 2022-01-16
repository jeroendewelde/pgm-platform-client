import Image from "next/image";
import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";

import teacher from "../../assets/test/teacher.png";

const Container = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  width: 15rem;
  height: 15rem;
  border: 2px solid ${(props) => props.theme.colors.purple};
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.bg_gradient_color_2)};
  border-radius: 50%;
  overflow: hidden;
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
