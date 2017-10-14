import React from 'react'
import Home from './Home'
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
      <Route exact path='/' render={props => <Home {...props} /> }/>
      <Route exact path='/register' render={props => <Register {...props} /> }/>
      <Route exact path='/login' render={props => <Login {...props} /> }/>
    </Switch>
  </BrowserRouter>
)
