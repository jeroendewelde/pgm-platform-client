import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { transparentize } from "polished";

const LinkStyle = styled.div`
  width: fit-content;
  width: max-content;
  font-size: ${(props) => props.theme.fontSizes.small_btn};
  padding: 0.5rem 1rem;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: ${(props) => props.theme.borderRadius.small};
  background-color: ${(props) =>
    transparentize(0.6, props.theme.colors.purple)};
  border: 1px solid ${(props) => props.theme.colors.purple};
  transition: ${(props) => props.theme.transition.normal};

  &:hover {
    background-color: ${(props) =>
      transparentize(0, props.theme.colors.purple)};
    box-shadow: 0 0 20px ${(props) => props.theme.colors.purple},
      0 0 40px ${(props) => props.theme.colors.purple},
      0 0 80px ${(props) => props.theme.colors.purple};

    .icon {
      transform: translateX(-0.5rem);
      margin-left: 1.5rem;
    }
  }

  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.white};

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
}

const LinkButton = ({ href, children }: LinkButtonProps) => {
  return (
    <LinkStyle>
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
