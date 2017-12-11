import React from 'react';
import { graphql } from 'react-apollo';

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
      <section>
        <form className='form-group'>
            <input name="word" onChange={this.onChange} placeholder="Add a word..." value={word} />
          <button className="btn" onClick={(event)=> createWord(word, event)}>Save</button>
        </form>
        {errorList.length ?
          <ul>
            <li>There was some errors with your submission</li>
            <li>{errorList}</li>
          </ul>
         : null}
      </section>
    );
  }
}

export default CreateWord;
