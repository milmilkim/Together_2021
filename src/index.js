import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import {
  ApolloClient,
  createHttpLink,
  split,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getId } from 'components/Token';

const params = new URLSearchParams(window.location.search);
// const userId = params.get('userId') ?? 1;
const userId = getId();

const httpLink = createHttpLink({
  uri: 'https://chat.habin.io/query',
});
const wsLink = new WebSocketLink({
  uri: 'wss://chat.habin.io/query',
  options: {
    reconnect: true,
    connectionParams: () => {
      return {
        headers: {
          'user-id': userId,
        },
      };
    },
  },
});
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'user-id': userId,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById('root'),
);
