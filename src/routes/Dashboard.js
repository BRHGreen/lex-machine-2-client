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
      {getUser &&
        <div>
          <h1>user: {getUser.username}</h1>
          <div>
            <h1>age: {getUser.profile.age}</h1>
            <h1>occupation: {getUser.profile.occupation}</h1>
          </div>
          <div>
            <h3>Your Words:</h3>
              <ul>
              {getUser.words &&
                getUser.words.map((word, i) => {
                  return (
                  <li key={i}>
                    <p>{word.word}</p>
                  <button onClick={() => alert('update')}>Update</button>
                  <button onClick={() => alert('delete')}>Delete</button>
                  </li>
                  )
                })
              }
              </ul>
          </div>
        </div>
      }
      </div>
    )
  }
}

export default graphql(getUser)(Dashboard)
// export default Dashboard
