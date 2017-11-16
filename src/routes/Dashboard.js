import React from 'react'
import { getUser } from '../graphql/user'
import { graphql } from 'react-apollo'

class Dashboard extends React.Component {
  render () {
    console.log('this.props: ', this.props);
    const { getUser, loading } = this.props.data
    return (
      <div>
      {!loading &&
        <h1>user: {getUser.username}</h1>
      }
      </div>
    )
  }
}

export default graphql(getUser)(Dashboard)
// export default Dashboard
