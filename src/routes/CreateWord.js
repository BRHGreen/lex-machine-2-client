import React from 'react'
import { graphql } from 'react-apollo'

class CreateWord extends React.Component {
  state = {
    word: '',
    errors: {},
    data: null,
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  define = async (word, event) => {
    const apiKey = '30197bf4f65d0e10cc369439c2821011532dc2d97f23f3278'
    const baseUri = 'http://api.wordnik.com:80/v4/word.json/'
    event.preventDefault()
    const uri = `${baseUri}${word}/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=${apiKey}`
    const response = await fetch(uri)
    const json = await response.json();

    console.log('getting data:', json[0].word);
    
    this.setState({ data: json })
    console.log('state:', this.state);
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
            onClick={(event) => this.define(word, event)}
            >
            Search
          </button>
        </form>
        {data &&
          <div>{data[0].word}</div>
        }
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
