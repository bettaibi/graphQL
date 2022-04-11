import React from 'react';
import {createRoot} from 'react-dom/client';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split 
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import App from './App';
import './index.css';

// Create HTTP Link 
const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: localStorage.getItem(AUTH_TOKEN)
    // }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  httpLink
  // authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
   <App />
  </ApolloProvider>,
)

