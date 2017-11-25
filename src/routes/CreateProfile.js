import React from 'react';
import { graphql } from 'react-apollo';
import { createProfileMutation } from '../graphql/user';

class CreateProfile extends React.Component {
    state = {
      age: '',
      occupation: '',
      errors: {},
    }

  onSubmit = async (event) => {
    event.preventDefault()
    const { age, occupation } = this.state;
    const response = await this.props.mutate({
      variables: { age, occupation },
    });

    console.log('res: ', response);

    const {
      ok, errors,
    } = response.data.createProfile;

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
    const { age, occupation, profileError } = this.state;

    const errorList = [];

    if (profileError) {
      errorList.push(profileError);
    }

    return (
      <div className='centered'>
        <h2>Create Profile</h2>
        <form className='form-group'>
            <input name="age" onChange={this.onChange} placeholder="age" value={age} />
            <input name="occupation" onChange={this.onChange} placeholder="occupation" value={occupation}
          />
          <button className='btn' onClick={this.onSubmit}>Save</button>
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

export default graphql(createProfileMutation)(CreateProfile);
