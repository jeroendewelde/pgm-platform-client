import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    overflow-x: hidden !important;
    min-height: 100vh;
    font-family: 'Prompt', sans-serif;
    color: ${(props) => props.theme.colors.white};
    background: linear-gradient(34deg, rgba(3,7,18,1) 51%, rgba(19,16,41,1) 100%);
  }
  h1, .GlitchTitle {
    color: ${(props) => props.theme.colors.white};
    text-transform: uppercase;
    font-family: 'Prompt', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.emedium};
    line-height: 1.2;
    @media (min-width: ${(props) => props.theme.width.medium}) {
      font-size: ${(props) => props.theme.fontSizes.elarge};
    }
    font-weight: ${(props) => props.theme.fontWeights.bold};
    margin-bottom: 2rem;
  }
  h2 {
    font-size: ${(props) => props.theme.fontSizes.medium};
    line-height: 1.2;
    color: ${(props) => props.theme.colors.white};
    @media (min-width: ${(props) => props.theme.width.medium}) {
      font-size: ${(props) => props.theme.fontSizes.emedium};
    }
  }
  ul {
    list-style: none;
  }
  li {
    margin-bottom: 0.5rem
  }
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
    line-height: 1.5;
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.normal};
    line-height: 1.5;
    margin-bottom: 0.5rem;

    @media (min-width: ${(props) => props.theme.width.small}) {
        font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
  a {
    text-decoration: none;
  }
  input, textarea {
    font-family: 'Poppins';
    font-size: ${(props) => props.theme.fontSizes.small};
    padding-bottom: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}
`;

export default GlobalStyle;
