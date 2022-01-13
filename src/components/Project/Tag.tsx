import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";

const Container = styled.div<TagProps>`
  border: ${({ learningLine }) => {
    if (learningLine === "blue") {
      return (props) => `2px solid ${props.theme.colors.blue}`;
    } else if (learningLine === "green") {
      return (props) => `2px solid ${props.theme.colors.green}`;
    } else if (learningLine === "orange") {
      return (props) => `2px solid ${props.theme.colors.orange}`;
    } else if (learningLine === "pink") {
      return (props) => `2px solid ${props.theme.colors.pink}`;
    } else if (learningLine === "red") {
      return (props) => `2px solid ${props.theme.colors.red}`;
    }
  }};

  background-color: ${({ learningLine }) => {
    if (learningLine === "blue") {
      return (props) => transparentize(0.4, props.theme.colors.blue);
    } else if (learningLine === "green") {
      return (props) => transparentize(0.4, props.theme.colors.green);
    } else if (learningLine === "orange") {
      return (props) => transparentize(0.4, props.theme.colors.orange);
    } else if (learningLine === "pink") {
      return (props) => transparentize(0.4, props.theme.colors.pink);
    } else if (learningLine === "red") {
      return (props) => transparentize(0.4, props.theme.colors.red);
    }
  }};

  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.small};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  p {
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.esmall};
    margin: 0;
  }
`;

interface TagProps {
  title?: string;
  learningLine: string;
}

const Tag = ({ title, learningLine }: TagProps) => {
  return (
    <Container learningLine={learningLine}>
      <p>{title}</p>
    </Container>
  );
};

export default Tag;
