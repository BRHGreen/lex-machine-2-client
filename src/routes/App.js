import React from 'react';
import Dashboard from './Dashboard'
import LandingPage from './LandingPage'
import decode from 'jwt-decode'


const App = () => {
  const currentUser = () => {
    try {
      localStorage.getItem('token')
      const token = localStorage.getItem('token');
      const user = decode(token);
      return(user);
    } catch (err) {
      return null
    }
  }
  return (
  <div>
    {currentUser() 
      ? <Dashboard currentUser={currentUser().user.id}/>
      : <LandingPage />
    }
  </div>
  )
}

export default App