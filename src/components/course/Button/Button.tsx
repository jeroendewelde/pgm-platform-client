import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  background-color: ${(props) => props.theme.colors.primaryAccentColor};
  color: ${(props) => props.theme.colors.white};
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryAccentColor};
  }
`;

const Button = () => {
  return <ButtonStyle>Test</ButtonStyle>;
};

export default Button;
