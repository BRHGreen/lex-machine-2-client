import React from 'react'
import WordListItem from './WordListItem'
import { getUser } from '../graphql/user'
import { deleteWord } from '../graphql/word'
import { graphql } from 'react-apollo'
import '../styles/app.css'

class Dashboard extends React.Component {
  deleteWord = async (word) => {
    const response =  await this.props.mutate({
      variables: { word },
      refetchQueries: [{
        query: getUser
      }]
    })
  }
  render () {
    console.log('this.props: ', this.props);
    const { getUser } = this.props.data
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
           <WordListItem
            getUser={getUser}
            deleteWord={this.deleteWord}
           />
            </ul>
          </div>
        </div>
      }
      </div>
    )
  }
}

export default graphql(getUser)(
  graphql(deleteWord)(Dashboard)
)

