import React from 'react';
import { graphql } from 'react-apollo';
import { login } from '../graphql/auth';

class Login extends React.Component {
    state = {
      email: '',
      password: '',
      errors: {},
    };

  onSubmit = async (event) => {
    event.preventDefault()
    const { email, password } = this.state;
    const response = await this.props.mutate({
      variables: { email, password },
    });

    const {
      ok, token, refreshToken, errors,
    } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
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
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <div className='centered'>
        <h2>Login</h2>
        <form className='form-group'>
          <input name="email" onChange={this.onChange} value={email} placeholder="Email" />
          <input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          />
          <button className='btn' onClick={this.onSubmit} >Submit</button>
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

export default graphql(login)(Login);
