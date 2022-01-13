import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

const ButtonStyle = styled.button<ButtonProps>`
  font-size: ${(props) => props.theme.fontSizes.small_btn};
  padding: 0.5rem 1rem;
  border: none;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  background-color: ${({ variant }) =>
    variant === "primary"
      ? (props) => transparentize(0.6, props.theme.colors.purple)
      : (props) => props.theme.colors.bg_gradient_color_1};
  border: ${({ variant }) =>
    variant === "primary"
      ? (props) => `2px solid ${props.theme.colors.purple}`
      : (props) => `1px solid ${props.theme.colors.white}`};

  color: ${(props) => props.theme.colors.white};
  box-shadow: ${({ variant }) =>
    variant === "primary"
      ? (props) => `0 0 10px ${props.theme.colors.purple}`
      : "none"};
  transition: ${(props) => props.theme.transition.normal};
  font-family: ${(props) => props.theme.fontFamilies.secondary};

  &:hover {
    background-color: ${({ variant }) =>
      variant === "primary"
        ? (props) => transparentize(0, props.theme.colors.purple)
        : (props) => props.theme.colors.white};
    box-shadow: ${({ variant }) =>
      variant === "primary"
        ? (props) =>
            `0 0 20px ${props.theme.colors.purple}, 0 0 40px ${props.theme.colors.purple}, 0 0 80px ${props.theme.colors.purple}`
        : (props) => `0 0 20px ${props.theme.colors.white}`};
    color: ${({ variant }) =>
      variant === "primary"
        ? (props) => props.theme.colors.white
        : (props) => props.theme.colors.black};
  }
`;

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <ButtonStyle
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
