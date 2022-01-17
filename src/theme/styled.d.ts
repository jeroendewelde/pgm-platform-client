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
      yellow: string;

      bg_gradient_color_1: string;
      bg_gradient_color_2: string;
    };
    fontFamilies: {
      primary: string;
      secondary: string;
    };
    fontSizes: {
      esmall: string;
      small: string;
      normal: string;
      medium: string;
      emedium: string;
      semimedium: string;
      large: string;
      elarge: string;
      slarge: string;
      small_btn: string;
      large_btn: string;
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
      esmall: string;
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
