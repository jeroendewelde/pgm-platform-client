import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from 'next/router';

import '../styles/global.css';


import { BaseLayout } from "../layouts";
import GlobalStyle from "../theme/globalStyles";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	console.log(router.pathname.split('/admin'));
	let isAdmin = false;
	if(router.pathname.split('/admin').length >= 2) {
		isAdmin = true;
	} 
  return (
    <ThemeProvider theme={theme}>
        <Head>
            <link rel="shortcut icon" href="/logo_purple.ico" />
        </Head>

      <GlobalStyle />

	  { !isAdmin ? (
	  	<BaseLayout>
		  <Component {...pageProps} />
		</BaseLayout> ) : (
			<Component {...pageProps} />
		) }
      {/* <BaseLayout>
      </BaseLayout> */}
    </ThemeProvider>
  );
}

export default MyApp;
