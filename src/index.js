import React from 'react';
import Routes from './routes'
import ReactDOM from 'react-dom'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'

import 'antd/dist/antd.css';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
});
const client = new ApolloClient({
  networkInterface: networkInterface
})

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
