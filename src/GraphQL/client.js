import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
    uri: 'https://maximum-crappie-64.hasura.app/v1/graphql',
    headers: {
        "x-hasura-admin-secret": "95XpeOrmpdFlkXKfIZEfahuQm2x1XH95EJx3o7wXcPXh6dNnB0jNybRPweNwr2He"
    }
});

const wsLink = new WebSocketLink({
    uri: 'wss://maximum-crappie-64.hasura.app/v1/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                "x-hasura-admin-secret": "95XpeOrmpdFlkXKfIZEfahuQm2x1XH95EJx3o7wXcPXh6dNnB0jNybRPweNwr2He"
            }
        }
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
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;