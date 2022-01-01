import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

const ButtonStyle = styled.button`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  background-color: ${(props) => transparentize(0.4, props.theme.colors.pink)};
  border: 2px solid ${(props) => props.theme.colors.pink};
  color: ${(props) => props.theme.colors.white};
  box-shadow: 0 0 20px ${(props) => props.theme.colors.pink};
`;

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
};

export default Button;
