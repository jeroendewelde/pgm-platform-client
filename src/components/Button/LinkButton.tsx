import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { transparentize } from "polished";

const LinkStyle = styled.div<LinkStyleProps>`
  max-width: 250px;
  width: fit-content;
  width: max-content;
  font-size: ${(props) => props.theme.fontSizes.small_btn};
  padding: 0.5rem 1rem;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: ${(props) => props.theme.borderRadius.small};
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

  @media (min-width: ${(props) => props.theme.width.esmall}) {
    max-width: none;
  }

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

    a {
      color: ${({ variant }) =>
        variant === "primary"
          ? (props) => props.theme.colors.white
          : (props) => props.theme.colors.black};
    }

    .icon {
      transform: translateX(-0.5rem);
      margin-left: 1.5rem;
    }
  }

  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.white};
    word-break: break-word;

    .icon {
      margin-left: 0.5rem;
      transform: rotate(180deg);
      transition: ${(props) => props.theme.transition.bounce};
      font-size: ${(props) => props.theme.fontSizes.medium};
      display: flex;
      align-items: center;
      justify-content: center;

      @media (min-width: ${(props) => props.theme.width.esmall}) {
        font-size: ${(props) => props.theme.fontSizes.semimedium};
      }
    }

    .cta {
      transition: ${(props) => props.theme.transition.normal};
      font-size: ${(props) => props.theme.fontSizes.small};

      @media (min-width: ${(props) => props.theme.width.esmall}) {
        font-size: ${(props) => props.theme.fontSizes.normal};
      }
    }
  }
`;

export interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary";
}

interface LinkStyleProps {
  variant: "primary" | "secondary";
}

const LinkButton = ({ href, children, variant }: LinkButtonProps) => {
  console.log(variant);
  return (
    <LinkStyle variant={variant}>
      <Link href={href}>
        <a>
          <span className="cta">{children}</span>
          <span className="icon">
            <MdOutlineKeyboardBackspace />
          </span>
        </a>
      </Link>
    </LinkStyle>
  );
};

export default LinkButton;
