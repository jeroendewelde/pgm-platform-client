import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

// Styling
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";
import GlobalStyle from "../theme/globalStyles";
import "../styles/global.css";
import { BaseLayout } from "../layouts";

// Apollo
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let isAdmin = false;
  if (router.pathname.split("/admin").length >= 2) {
    isAdmin = true;
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="shortcut icon" href="/logo_purple.ico" />
        </Head>
        <GlobalStyle />

        {!isAdmin ? (
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
