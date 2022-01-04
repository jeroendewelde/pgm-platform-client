import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";

import type { AppProps } from "next/app";
import { Button } from "../components/Button";
import GlobalStyle from "../theme/globalStyles";
import { GlitchTitle } from "../components/Titles/GlitchTitle";
import { CourseTitle } from "../components/Titles/CourseTitle";
import { Card, CourseList } from "../components/Course";
import { Header } from "../components/layout/Header";

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
`;

const tags = ["react", "javascript", "typescript"];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <GlobalStyle />
      <GlitchTitle>Haalloo</GlitchTitle>
      <CourseTitle learningLine={"green"}>Computer Systems</CourseTitle>
      <Text>
        <Card tags={tags} title="computer systems" learningLine="red" />
        <Card tags={tags} title="computer systems" learningLine="green" />
        <Card tags={tags} title="computer systems" learningLine="blue" />
        <Card title="computer systems" learningLine="pink" />
      </Text>
      <CourseList />

      <Button variant="primary"> Hello </Button>

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
