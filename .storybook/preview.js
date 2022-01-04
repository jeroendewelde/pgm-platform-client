import React from "react";
import { ThemeProvider } from "styled-components";
import * as NextImage from "next/image";

import theme from "../src/theme/theme";
import GlobalStyle from "../src/theme/globalStyles";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "default",
    values: [
      { name: "default", value: "#030712" },
      {
        name: "gradient",
        value:
          "linear-gradient(31deg, rgba(3,7,18,1) 0%, rgba(19,16,41,1) 100%)",
      },
    ],
  },
};
