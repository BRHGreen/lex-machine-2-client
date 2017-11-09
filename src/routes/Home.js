import React from 'react'
import { getUser } from '../graphql/user'
import { graphql } from 'react-apollo'
import decode from 'jwt-decode'

class Home extends React.Component {
  render () {
    const { loading } = this.props
    if (loading) {
      return null;
    }
    let username = '';
    try {
      const token = localStorage.getItem('token');
      const user = decode(token);
      console.log('user: ', user);
    } catch (err) {
      console.log(err);
    }
    console.log('username: ', username);
    console.log('this.props: ', this.props);
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}

export default graphql(getUser, { options : { variables: { id: 1 }}})(Home)
// export default Home
