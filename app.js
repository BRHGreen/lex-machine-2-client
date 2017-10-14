import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider, createNetworkInterface } from 'react-apollo'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import test from './test'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  networkInterface: networkInterface
});


const Root = () => {
  return (
  <ApolloProvider client={client}>
    <BrowserRouter history={hashHistory}>
      <Route path='/' component={test} />
    </BrowserRouter>
  </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
