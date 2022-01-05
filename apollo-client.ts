import { 
  ApolloClient,
  InMemoryCache
 } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // uri: process.env.NEXT_PUBLIC_HOST,
  cache: new InMemoryCache(),
  
});
// const client = new ApolloClient({
//   uri: 'https://pgm-platform-server.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
//   headers: {
//     "Authorization": "Bearer 384d4710b420821dd7c864bcffd28771b10956aa6e1c20797d4573587729dc302942228589c243fbd4dccfae537f2337ccf12e29aeee5f446e40de3c3607d4c40f39a735c17edea71f5e48f3471d0e38f9fde5a93f964d6532d46cb551aa7f14231e70e8ef62b73b3c217de5beffdef0b3d8134ffcc451035d0b9243162d7ef9"
//   }
// });

export default client;