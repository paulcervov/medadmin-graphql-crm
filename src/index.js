import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, InMemoryCache,} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    findEmployers: offsetLimitPagination(['orderBy', 'searchQuery']),
                },
            },
        },
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
