import Link from "next/link";
import React, { useContext } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import styled from "styled-components";
import { CursorContext } from "../../context/CursorContext";

const LinkStyle = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin-bottom: 2rem;
  }
  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.white};

    .cta {
      border-bottom: 2px solid ${(props) => props.theme.colors.turquoise};
    }

    &:hover {
      .cta {
        color: ${(props) => props.theme.colors.turquoise};
      }

      .icon {
        transform: translateX(-0.5rem);
      }
    }

    .icon {
      transition: ${(props) => props.theme.transition.bounce};
      font-size: ${(props) => props.theme.fontSizes.medium};
      margin-right: 0.5rem;
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

export interface CTALinkProps {
  href: string;
  children: React.ReactNode;
}

const CTALink = ({ href, children }: CTALinkProps) => {
  const { setCursorHover } = useContext(CursorContext);

  const handleMouseEnter = () => {
    setCursorHover(true);
    //change z-index of the card to be on top of the other cursor
    const element = document.querySelector(".cursor") as HTMLElement;
    if (element !== null) {
      element.style.zIndex = "0";
    }
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
    const element = document.querySelector(".cursor") as HTMLElement;

    if (element !== null) {
      element.style.zIndex = "11";
    }
  };
  return (
    <LinkStyle
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseLeave}
    >
      <Link href={href}>
        <a>
          <span className="icon">
            <MdOutlineKeyboardBackspace />
          </span>
          <span className="cta">{children}</span>
        </a>
      </Link>
    </LinkStyle>
  );
};

export default CTALink;
