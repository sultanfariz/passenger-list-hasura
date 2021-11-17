import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Apollo
import {
  ApolloClient, InMemoryCache, ApolloProvider
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://maximum-crappie-64.hasura.app/v1/graphql',
  headers: {
    "x-hasura-admin-secret": "95XpeOrmpdFlkXKfIZEfahuQm2x1XH95EJx3o7wXcPXh6dNnB0jNybRPweNwr2He"
  }
});

const wsLink = new WebSocketLink({
  uri: 'ws://maximum-crappie-64.hasura.app/v1/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  uri: 'https://maximum-crappie-64.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": "95XpeOrmpdFlkXKfIZEfahuQm2x1XH95EJx3o7wXcPXh6dNnB0jNybRPweNwr2He"
  }
});
// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
