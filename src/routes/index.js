import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'


import Register from './Register'

export default () =>(
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" render={props => <Register {...props} /> }/>
    </Switch>
  </BrowserRouter>
)
