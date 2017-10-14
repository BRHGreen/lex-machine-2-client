import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Test extends Component {
  render() {
    return (
      <div>
        <p>Yo, all seems to be working yeah?</p>
      </div>
    )
  }
}

const query = gql`
  query {
    allUsers {
      id
      username
    }
  }
`

export default graphql(query)(Test)
