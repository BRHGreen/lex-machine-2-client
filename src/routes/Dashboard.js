import React from 'react'
import { getUser } from '../graphql/user'
import { graphql } from 'react-apollo'
import decode from 'jwt-decode'

// const currentUser = () => {
//   try {
//     localStorage.getItem('token')
//     const token = localStorage.getItem('token');
//     const user = decode(token);
//     return(user);
//   } catch (err) {
//     return null
//   }
// }

class Dashboard extends React.Component {
  render () {
    const { currentUser } = this.props
    console.log('currentUser', currentUser);
    return (
      <div>

        <h1>Dashboard</h1>

      </div>
    )
  }
}

export default graphql(getUser, { options : { variables: props => ({ id: props.currentUser })}})(Dashboard)
// export default Dashboard
