import React from 'react'
import { getUser } from '../graphql/user'
import { graphql } from 'react-apollo'
import '../styles/app.css'

class Dashboard extends React.Component {
  render () {
    console.log('this.props: ', this.props);
    const { getUser, loading } = this.props.data
    return (
      <div>
      {!loading &&
        <div>
          <h1>user: {getUser.username}</h1>
          {getUser.profile &&
          <div>
            <h1>age: {getUser.profile.age}</h1>
            <h1>occupation: {getUser.profile.occupation}</h1>
          </div>
        }
        </div>
      }
      </div>
    )
  }
}

export default graphql(getUser)(Dashboard)
// export default Dashboard
