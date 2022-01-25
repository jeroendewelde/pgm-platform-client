import Link from "next/link";
import { lighten, transparentize } from "polished";
import React from "react";
import styled from "styled-components";

const Container = styled.a`
  min-height: 10rem;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${(props) =>
    lighten(0.05, props.theme.colors.bg_gradient_color_1)};
  border: 1px solid ${(props) => transparentize(0.5, props.theme.colors.white)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  width: 100%;
  margin-bottom: 1rem;
  transition: ${(props) => props.theme.transition.bounce};

  &:hover {
    background-color: ${(props) =>
      transparentize(0.5, props.theme.colors.bg_gradient_color_1)};
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(50px);
  }

  @media (min-width: ${(props) => props.theme.width.small}) {
    width: calc(50% - 0.5rem);
  }
  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: calc(33.3333% - 0.5rem);
  }

  .title {
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    margin-bottom: 1rem;
    display: block;
  }
`;

interface CardProps {
  title: string;
  text: string;
  url: string;
}

const Card = ({ title, text, url }: CardProps) => {
  return (
    <Container href={url} target="blank">
      <li>
        <span className="title">{title}</span>
        <span className="text">{text}</span>
      </li>
    </Container>
  );
};

export default Card;
