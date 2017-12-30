import React from 'react';
import { graphql } from 'react-apollo';
import { register } from '../graphql/auth'

class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });

    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        // err['passwordError'] = 'too long..';
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const {
      username, email, password, usernameError, emailError, passwordError,
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <div className='centered'>
        <h2>Register</h2>
        <form className='form-group'>
            <input
              name="username"
              onChange={this.onChange}
              value={username}
              placeholder="Username"

            />
            <input name="email" onChange={this.onChange} value={email} placeholder="Email" />
            <input
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"

            />
          <button className='btn' onClick={this.onSubmit}>Submit</button>
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

export default graphql(register)(Register);
