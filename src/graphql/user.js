import gql from 'graphql-tag'

export const currentUser = gql`
query currentUser {
  getUser {
    id
    username
  }
}
`;

export const register = gql`
mutation register ($username: String!) {
  createUser (username: $username) {
   id
   username
  }
}`;
export const login = gql`
mutation register ($username: String!) {
  createUser (username: $username) {
   id
   username
  }
}`;
