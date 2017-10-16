import React from 'react';
import { Button, Input } from 'antd'
import { graphql } from 'react-apollo'
import { register } from '../graphql/user'

class Register extends React.Component {
  state = {
    username: ''
  }

  onChange = (e) => {
    if (e.target.name === 'isAdmin') {

    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
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
      <h1>Register</h1>
        <Input
          name='username'
          placeholder='username'
          onChange={e => this.onChange(e)}
          value={this.state.username}
          />
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
          <Button onClick={() => this.onSubmit()} type='primary'>Register</Button>
      </div>
    )
  }
}

export default graphql(register)(Register)
