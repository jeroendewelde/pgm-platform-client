import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

const ButtonStyle = styled.button<ButtonProps>`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  background-color: ${({ variant }) =>
    variant === "primary"
      ? (props) => transparentize(0.4, props.theme.colors.pink)
      : (props) => props.theme.colors.bg_gradient_color_1};
  border: ${({ variant }) =>
    variant === "primary"
      ? (props) => `2px solid ${props.theme.colors.pink}`
      : (props) => `1px solid ${props.theme.colors.white}`};

  color: ${(props) => props.theme.colors.white};
  box-shadow: ${({ variant }) =>
    variant === "primary"
      ? (props) => `0 0 20px ${props.theme.colors.pink}`
      : "none"};

  font-family: ${(props) => props.theme.fontFamilies.secondary};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "primary"
        ? (props) => transparentize(0.6, props.theme.colors.pink)
        : (props) => props.theme.colors.white};
    box-shadow: ${({ variant }) =>
      variant === "primary"
        ? (props) => `0 0 20px ${props.theme.colors.pink}`
        : "none"};
    color: ${({ variant }) =>
      variant === "primary"
        ? (props) => props.theme.colors.white
        : (props) => props.theme.colors.black};
  }
`;

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  return (
    <ButtonStyle variant={variant} {...props}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
