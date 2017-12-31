import React from 'react'
import { graphql } from 'react-apollo'
import { define } from '../components/Wordnik'

class CreateWord extends React.Component {
  state = {
    word: '',
    errors: {},
    data: null,
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSearch = async (word, event) => {
    const res = await define(word, event)
    this.setState({ data: res }) 
  }

  render() {
    const { word, wordError, data } = this.state;
    const { createWord, define } = this.props;

    const errorList = [];

    if (wordError) {
      errorList.push(wordError);
    }
    
    return (
      <div>
        <form className='form-group'>
            <input name="word" onChange={this.onChange} placeholder="Add a word..." value={word} />
          <button 
            className="btn"
            onClick={(event) => this.handleSearch(word, event)}
            >
            Search
          </button>
        </form>
        <div>
        {data && 
          data.map((result, i) => (
            <div key={i}>
              <ul>
                <li className="capalaize">{result.word}</li>
                <li className="">{result.partOfSpeech}</li>
                <li className="">{result.text}</li>
                <li><button onClick={(event) => createWord(result.word, result.partOfSpeech, result.text, event)}>Save</button></li>
              </ul>
              <hr />
            </div>
            )
          )
        }
        </div>
        {errorList.length ?
          <ul>
            <li>There was some errors with your submission</li>
            <li>{errorList}</li>
          </ul>
         : null}
      </div>
    );
  }
}

export default CreateWord;
