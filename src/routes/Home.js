import React from 'react';
import { Input } from 'antd';
import { graphql } from 'react-apollo';
import { allUsers, me } from '../graphql/user';


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

export default graphql(allUsers)(Home)
