import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import styled from "styled-components";

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
  return (
    <LinkStyle>
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
