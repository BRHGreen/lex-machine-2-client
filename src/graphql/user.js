import gql from 'graphql-tag'

export const currentUser = gql`
query me {
  me {
    id
    username
  }
}
`;
export const allUsers = gql`
query allUsers {
    allUsers {
      username
    }
  }
`;

export const register = gql`
mutation register ($username: String!, $email: String!, $password: String!) {
  register (username: $username, email: $email, password: $password) {
   id
   username
  }
}`;
export const login = gql`
mutation login ($email: String!, $password: String!) {
  login (email: $email, password: $password)
}`;
