import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";

import type { AppProps } from "next/app";
import Head from "next/head";

import '../styles/global.css';


const Text = styled.p`
  color: red;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <Head>
            <link rel="shortcut icon" href="/logo_purple.ico" />
        </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}


export default MyApp;
