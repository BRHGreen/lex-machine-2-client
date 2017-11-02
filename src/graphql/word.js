import gql from 'graphql-tag';

export const createWord = gql`
  mutation($word: String!) {
    createWord(word: $word) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
