import gql from 'graphql-tag'

export const register = gql`
mutation register ($username: String!) {
  createUser (username: $username) {
   id
   username
  }
}`;
