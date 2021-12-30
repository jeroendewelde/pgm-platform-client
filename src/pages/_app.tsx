import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";

import type { AppProps } from "next/app";
import CourseList from "../components/course/CourseList";
import { Button } from "../components/Button";

// const client = new ApolloClient({
//     uri: 'http://localhost:1337/graphql',
//     cache: new InMemoryCache,
//     headers: {
//         "Authorization": "Bearer 384d4710b420821dd7c864bcffd28771b10956aa6e1c20797d4573587729dc302942228589c243fbd4dccfae537f2337ccf12e29aeee5f446e40de3c3607d4c40f39a735c17edea71f5e48f3471d0e38f9fde5a93f964d6532d46cb551aa7f14231e70e8ef62b73b3c217de5beffdef0b3d8134ffcc451035d0b9243162d7ef9"
//     }
// })

const Text = styled.p`
  color: red;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Text>Hello there!</Text>
      <CourseList />
      <Button> Hello </Button>

      <Component {...pageProps} />
    </ThemeProvider>
  );
  //   return (
  // <ApolloProvider client={client}>
  //       <>
  //       <p>
  //           Hello there!
  //       </p>
  //       <CourseList />

  //       <Component {...pageProps} />
  //       </>
  //       </ApolloProvider>
  //   )
}

export default MyApp;
