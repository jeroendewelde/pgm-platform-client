import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  colors: {
    black: "#000",
    white: "#FFF",
    gray: "#707070",

    pink: "#D6014D",
    purple: "#D6014D",
    red: "#ED0034",
    orange: "#F58732",
    green: "#5AB946",
    blue: "#00A5D9",
    turquoise: "#30D9CE",

    bg_gradient_color_1: "#030712",
    bg_gradient_color_2: "#131029",
  },
  fontFamilies: {
    primary: "Prompt",
    secondary: "Source Code Pro",
  },
  fontSizes: {
    small: "0.8rem",
    normal: "1rem",
    medium: "1.5rem",
    emedium: "2rem",
    large: "2.5rem",
    elarge: "3.5rem",
    slarge: "5rem",
    btn: "1.2rem",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    semiBold: 600,
    bold: 700,
  },
  borderRadius: {
    small: "0.1875rem",
    normal: "0.5rem",
    large: "1rem",
    circle: "50%",
  },
  width: {
    small: "576px",
    medium: "912px",
    large: "1280px",
    elarge: "1600px",
  },
  transition: {
    normal: "all 0.2s ease-in-out",
    medium: "all 0.5s ease-in-out",
  },
};

export default defaultTheme;
