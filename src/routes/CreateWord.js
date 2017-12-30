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
    this.setState({ data: res[0].word }) 
  }

  render() {
    const { word, wordError, data } = this.state;
    const { createWord, define } = this.props;

    const errorList = [];

    if (wordError) {
      errorList.push(wordError);
    }
    console.log('data', data);
    
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
        {data &&
          <div>{data}</div>
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
