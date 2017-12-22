import gql from 'graphql-tag';

export const getWord = gql`
  query($id: Int!) {
    getWord(id: $id) {
      word
    }
  }
`;

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
export const updateWord = gql`
  mutation($word: String!, $newWord: String!) {
    updateWord(word: $word, newWord: $newWord)
  }
`;
export const deleteWord = gql`
  mutation($word: String!) {
    deleteWord(word: $word)
  }
`;