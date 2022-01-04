import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";

const Container = styled.button`
  border: 2px solid ${(props) => props.theme.colors.turquoise};
  padding: 0.2rem 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.small};
  background: ${(props) => transparentize(0.6, props.theme.colors.turquoise)};
  cursor: pointer;
  transition: ${(props) => props.theme.transition.normal};

  &:hover {
    background: ${(props) => transparentize(0, props.theme.colors.turquoise)};
    border: 2px solid ${(props) => props.theme.colors.turquoise};
    box-shadow: ${(props) =>
      `0 0 20px ${transparentize(
        0.5,
        props.theme.colors.turquoise
      )}, 0 0 40px ${transparentize(
        0.6,
        props.theme.colors.turquoise
      )}, 0 0 80px ${transparentize(0.8, props.theme.colors.turquoise)}`};

    p {
      color: ${(props) => props.theme.colors.black};
    }
  }

  p {
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.small_btn};
    font-family: ${(props) => props.theme.fontFamilies.secondary};
    color: ${(props) => props.theme.colors.white};
  }
`;

const MenuButton = () => {
  return (
    <Container>
      <p>Menu</p>
    </Container>
  );
};

export default MenuButton;
