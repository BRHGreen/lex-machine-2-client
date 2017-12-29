import React from 'react'
import { graphql } from 'react-apollo'
import { Define } from '../components/Wordnik'

class CreateWord extends React.Component {
  state = {
    word: '',
    errors: {},
  }

  onChange = (e) => {
    console.log('onChange:', e.target.value);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { word, wordError } = this.state;
    const { createWord } = this.props;

    const errorList = [];

    if (wordError) {
      errorList.push(wordError);
    }

    return (
      <div>
        <form className='form-group'>
            <input name="word" onChange={this.onChange} placeholder="Add a word..." value={word} />
          <button className="btn" onClick={(event)=> Define(word, event)}>Save</button>
        </form>
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
