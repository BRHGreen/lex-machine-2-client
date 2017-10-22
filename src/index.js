import React from 'react';
import Routes from './routes'
import ReactDOM from 'react-dom'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'

import 'antd/dist/antd.css';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      // prefixing with `x-` is a nameing convention for custom headers
      req.options.headers['x-token'] = localStorage.getItem('token');
      req.options.headers['x-refresh-token'] = localStorage.getItem('refreshToken');
      next();
    },
  },
]);

networkInterface.useAfter([
  {
    applyAfterware({ response: { headers } }, next) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');
      if (token) {
        localStorage.setItem('token', token);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface: networkInterface
})

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
