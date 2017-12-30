import React from 'react'
import WordListItem from '../components/WordListItem'
import CreateWord from './CreateWord'
import { getUser } from '../graphql/user'
import { deleteWord } from '../graphql/word'
import { graphql, compose } from 'react-apollo'
import '../styles/app.css'
import { createWord } from '../graphql/word'
import { define } from '../components/Wordnik'


class Dashboard extends React.Component {
  deleteWord = async (word) => {
    const response =  await this.props.deleteWord({
      variables: { word },
      refetchQueries: [{
        query: getUser
      }]
    })
  }
  createWord = async(word, partOfSpeach, definition, event) => {
    console.log('definition', definition);
    
    event.preventDefault()
    const response = await this.props.createWord({
      variables: { word, partOfSpeach, definition },
      refetchQueries: [{
        query: getUser
      }]
    });
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

  refreshWordList  
  render () {
    const { getUser } = this.props.data
    return (
      <div>
      {getUser &&
        <div>
          <h1>Hi <span className="capalaize">{getUser.username}</span></h1>
          <div>
            <CreateWord 
            createWord={this.createWord}
            define={define}
            />
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


