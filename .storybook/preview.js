import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../src/theme/theme";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

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
