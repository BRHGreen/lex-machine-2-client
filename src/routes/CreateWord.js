import React from 'react';
import { graphql } from 'react-apollo';
import { createWord } from '../graphql/word';

class CreateWord extends React.Component {
  state = {
    word: '',
    errors: {},
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const { word } = this.state;
    const response = await this.props.mutate({
      variables: { word },
    });

    console.log('res: ', response);

    const {
      ok, errors,
    } = response.data.createWord;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  };

  onChange = (e) => {
    console.log('onChange:', e.target.value);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { word, wordError } = this.state;

    const errorList = [];

    if (wordError) {
      errorList.push(wordError);
    }

    return (
      <div className='centered'>
        <h2>Create Word</h2>
        <form className='form-group'>
            <input name="word" onChange={this.onChange} placeholder="Word" value={word} />
          <button className="btn" onClick={this.onSubmit}>Save</button>
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

export default graphql(createWord)(CreateWord);
