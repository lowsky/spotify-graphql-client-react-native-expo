import React from 'react';

import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import Main from './Main';

export default class App extends React.Component {
    // Initialize Apollo Client with URL to our serve
    createClient() {
        return new ApolloClient({
            link: createHttpLink({
                uri: 'http://spotify-graphql-server.herokuapp.com/graphql',
            }),
            cache: new InMemoryCache(),
        });
    }

    render() {
        return (
            <ApolloProvider client={this.createClient()}>
                <Main />
            </ApolloProvider>
        );
    }
}
