import React from 'react'
import decode from 'jwt-decode'
import App from './App'
import Register from './Register'
import Login from './Login'
import CreateWord from './CreateWord'
import Word from './Word'
import CreateProfile from './CreateProfile'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  params,
} from 'react-router-dom'

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false
  }
  return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))}
  />
);

export default () =>(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/create-word" exact component={CreateWord} />
      <PrivateRoute path="/create-profile" exact component={CreateProfile} />
      <Route path="/word/:id" exact component={Word} />
    </Switch>
  </BrowserRouter>
)
