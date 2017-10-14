import React from 'react';
import { Button, Input } from 'antd'
import { gql, graphql } from 'react-apollo'

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
          <Button onClick={() => this.onSubmit()} type='primary'>Register</Button>
      </div>
    )
  }
}
const mutation = gql`
mutation ($username: String!) {
  createUser (username: $username) {
   id
   username
  }
}`;

export default graphql(mutation)(Register)
