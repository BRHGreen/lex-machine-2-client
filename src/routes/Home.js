import React from 'react'
import { getUser } from '../graphql/user'
import { graphql } from 'react-apollo'
import decode from 'jwt-decode'

const currentUser = () => {
  const token = localStorage.getItem('token');
  const user = decode(token);
  return(user);
}

class Home extends React.Component {
  render () {
    const { loading } = this.props.data
    if (loading) {
      return null;
    }
    return (
      <div>
      {!loading &&
        <h1>Hello, {this.props.data.getUser.username}</h1>
      }
      </div>
    )
  }
}

console.log('currentUser', currentUser().user.id);

// export default graphql(getUser, { options : { variables: { id: currentUser().user.id }}})(Home)
export default Home
