import React from 'react'
import WordListItem from './WordListItem'
import CreateWord from './CreateWord'
import { getUser } from '../graphql/user'
import { deleteWord } from '../graphql/word'
import { graphql, compose } from 'react-apollo'
import '../styles/app.css'
import { createWord } from '../graphql/word';

class Dashboard extends React.Component {
  deleteWord = async (word) => {
    const response =  await this.props.deleteWord({
      variables: { word },
      refetchQueries: [{
        query: getUser
      }]
    })
  }
  createWord = async (word, event) => {
    console.log('word', word)
    console.log('event', event)
    event.preventDefault()
    const response = await this.props.createWord({
      variables: { word },
      refetchQueries: [{
        query: getUser
      }]
    });
    console.log('response', response)
    const {
      ok, errors,
    } = response.data.createWord;
    
    if (ok) {
      return
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  };

  componentWillMount () {
    const url = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/cat&app_id=20bfa8a3&app_key=3948870312a18afd5821771de48afe86'
    fetch(url).then(res => res.json())
  }

  refreshWordList  
  render () {
    const { getUser } = this.props.data
    console.log('props:', this.props)
    return (
      <div>
      {getUser &&
        <div>
          <h1>Hi <span className="capalaize">{getUser.username}</span></h1>
          <div>
            <CreateWord createWord={this.createWord}/>
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

const DashboardWithMutations = compose(
  graphql(deleteWord, {
    name: 'deleteWord'
  }),
  graphql(createWord, {
    name: 'createWord'
  }),
  graphql(getUser)
)(Dashboard)

export default DashboardWithMutations


