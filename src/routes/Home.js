import React from 'react';
import { Button, Input } from 'antd'
import { graphql } from 'react-apollo'
import { currentUser } from '../graphql/user'

class Home extends React.Component {
  state = {
    username: ''
  }

  render () {
    console.log('this.props', this.props);
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}

export default graphql(currentUser)(Home)
