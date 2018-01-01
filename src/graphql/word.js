import gql from 'graphql-tag';

export const getWord = gql`
  query($id: Int!) {
    getWord(id: $id) {
      word
      partOfSpeach
      definition
      id
    }
  }
`;

export const createWord = gql`
  mutation($word: String!, $partOfSpeach: String, $definition: String) {
    createWord(word: $word, partOfSpeach: $partOfSpeach, definition: $definition) {
      ok
      errors {
        path
        message
      }
    }
  }
`
export const updateWord = gql`
  mutation($id: Int!, $newWord: String, $newPartOfSpeach: String, $newDefinition: String) {
    updateWord(id: $id, newWord: $newWord, newPartOfSpeach: $newPartOfSpeach, newDefinition: $newDefinition)
  }
`
export const deleteWord = gql`
  mutation($word: String!) {
    deleteWord(word: $word)
  }
`
