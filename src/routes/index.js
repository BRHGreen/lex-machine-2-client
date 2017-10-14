import React from 'react'
import Register from './Register'
import Login from './Login'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'



export default () =>(
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" render={props => <Register {...props} /> }/>
      <Route exact path="/login" render={props => <Login {...props} /> }/>
    </Switch>
  </BrowserRouter>
)
