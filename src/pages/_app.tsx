import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";

import type { AppProps } from "next/app";
import CourseList from "../components/Course/CourseList";
import { Button } from "../components/Button";

const Text = styled.p`
  color: red;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Text>Hello there!</Text>
      {/* <CourseList {... pageProps } /> */}
      <Button> Hello </Button>

      <Component {...pageProps} />
    </ThemeProvider>
  );
}


export default MyApp;
