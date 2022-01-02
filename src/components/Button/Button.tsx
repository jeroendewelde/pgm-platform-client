import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primaryAccentColor};
`;

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
};

export default Button;
