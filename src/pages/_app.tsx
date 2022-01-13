import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";

import type { AppProps } from "next/app";
import Head from "next/head";

import '../styles/global.css';


import { BaseLayout } from "../layouts";
import GlobalStyle from "../theme/globalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <Head>
            <link rel="shortcut icon" href="/logo_purple.ico" />
        </Head>
      {/* <Component {...pageProps} /> */}




      <GlobalStyle />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default MyApp;
