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

      primary_button_bg: string;
      secondary_button_bg: string;
    };
    fontFamilies: {
      primary: string;
      secondary: string;
    };
    fontSizes: {
      small: string;
      normal: string;
      medium: string;
      emedium: string;
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
