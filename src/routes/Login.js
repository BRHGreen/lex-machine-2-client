import React from 'react';
import { Button, Input } from 'antd'
import { graphql } from 'react-apollo'
import { login } from '../graphql/user'

class Login extends React.Component {
  state = {
    username: ''
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
    console.log(response);
  }

  render () {
    return (
      <div>
      <h1>Login</h1>
        <Input
          name='username'
          placeholder='username'
          onChange={e => this.onChange(e)}
          value={this.state.username}
          />
          <Button onClick={() => this.onSubmit()} type='primary'>Login</Button>
      </div>
    )
  }
}

export default graphql(login)(Login)
