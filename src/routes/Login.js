import React from 'react';
import { Button, Input } from 'antd'
import { graphql } from 'react-apollo'
import { loginMutation } from '../graphql/user'

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    })
    console.log('login res: ', response);
  }

  render () {
    console.log('props:', this.props);
    return (
      <div>
      <h1>Login</h1>
        <Input
          name='email'
          placeholder='email'
          onChange={e => this.onChange(e)}
          value={this.state.email}
          />
        <Input
          name='password'
          placeholder='password'
          type='password'
          onChange={e => this.onChange(e)}
          value={this.state.password}
          />
          <Button onClick={() => this.onSubmit()} type='primary'>Login</Button>
      </div>
    )
  }
}

export default graphql(loginMutation)(Login)
