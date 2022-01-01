import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      gray: string;

      pink: string;
      purple: string;
      red: string;
      orange: string;
      green: string;
      blue: string;
      turquoise: string;

      bg_gradient_color_1: string;
      bg_gradient_color_2: string;
    };
    fontSizes: {
      small: string;
      normal: string;
      medium: string;
      emedium: string;
      large: string;
      elarge: string;
      slarge: string;
      btn: string;
    };
    fontWeights: {
      light: number;
      normal: number;
      semiBold: number;
      bold: number;
    };
    borderRadius: {
      small: string;
      normal: string;
      large: string;
      circle: string;
    };
    width: {
      small: string;
      medium: string;
      large: string;
      elarge: string;
    };
    transition: {
      normal: string;
      medium: string;
    };
  }
}
