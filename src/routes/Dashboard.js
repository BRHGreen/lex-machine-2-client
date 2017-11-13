import React from 'react'
import { getUser } from '../graphql/user'
import { graphql } from 'react-apollo'

class Dashboard extends React.Component {
  render () {
    console.log('this.props: ', this.props);
    const { currentUser } = this.props
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default graphql(getUser)(Dashboard)
// export default Dashboard
