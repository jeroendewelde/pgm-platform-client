import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";

const GlitchTitleStyle = styled.h1`
  text-shadow: 0.05em 0 0
      ${(props) => transparentize(0.3, props.theme.colors.pink)},
    -0.025em -0.05em 0
      ${(props) => transparentize(0.3, props.theme.colors.green)},
    0.025em 0.05em 0 ${(props) => transparentize(0.3, props.theme.colors.blue)};
  position: relative;

  animation: glitch 0.65s infinite;

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0
          ${(props) => transparentize(0.3, props.theme.colors.pink)},
        -0.05em -0.025em 0
          ${(props) => transparentize(0.3, props.theme.colors.green)},
        -0.025em 0.05em 0 ${(props) => transparentize(0.3, props.theme.colors.blue)};
    }
    14% {
      text-shadow: 0.05em 0 0
          ${(props) => transparentize(0.3, props.theme.colors.pink)},
        -0.05em -0.025em 0
          ${(props) => transparentize(0.3, props.theme.colors.green)},
        -0.025em 0.05em 0 ${(props) => transparentize(0.3, props.theme.colors.blue)};
    }
    15% {
      text-shadow: -0.05em -0.025em 0 ${(props) => transparentize(0.3, props.theme.colors.pink)},
        0.025em 0.025em 0
          ${(props) => transparentize(0.3, props.theme.colors.green)},
        -0.05em -0.05em 0
          ${(props) => transparentize(0.3, props.theme.colors.blue)};
    }
    49% {
      text-shadow: -0.05em -0.025em 0 ${(props) => transparentize(0.3, props.theme.colors.pink)},
        0.025em 0.025em 0
          ${(props) => transparentize(0.3, props.theme.colors.green)},
        -0.05em -0.05em 0
          ${(props) => transparentize(0.3, props.theme.colors.blue)};
    }
    50% {
      text-shadow: 0.025em 0.05em 0
          ${(props) => transparentize(0.3, props.theme.colors.pink)},
        0.05em 0 0 ${(props) => transparentize(0.3, props.theme.colors.green)},
        0 -0.05em 0 ${(props) => transparentize(0.3, props.theme.colors.blue)};
    }
    99% {
      text-shadow: 0.025em 0.05em 0
          ${(props) => transparentize(0.3, props.theme.colors.pink)},
        0.05em 0 0 ${(props) => transparentize(0.3, props.theme.colors.green)},
        0 -0.05em 0 ${(props) => transparentize(0.3, props.theme.colors.blue)};
    }
    100% {
      text-shadow: -0.025em 0 0
          ${(props) => transparentize(0.3, props.theme.colors.pink)},
        -0.025em -0.025em 0
          ${(props) => transparentize(0.3, props.theme.colors.green)},
        -0.025em -0.05em 0
          ${(props) => transparentize(0.3, props.theme.colors.blue)};
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
  }

  span:first-child {
    animation: glitch 0.65s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-0.025em, -0.0125em);
    /* color: green; */
    opacity: 0.8;
  }

  span:last-child {
    animation: glitch 0.375s infinite;
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    transform: translate(0.0125em, 0.025em);
    opacity: 0.8;
  }
`;

export interface GlitchTitleProps {
  children: React.ReactNode;
}

const GlitchTitle = ({ children }: GlitchTitleProps) => {
  return (
    <GlitchTitleStyle>
      <span className="GlitchTitle" aria-hidden="true">
        {children}
      </span>

      <span className="GlitchTitle" aria-hidden="true">
        {children}
      </span>

      {children}
    </GlitchTitleStyle>
  );
};

export default GlitchTitle;
