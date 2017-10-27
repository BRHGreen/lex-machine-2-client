import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class CreateWord extends React.Component {
  state = {
    word: '',
    wordError: '',
  }

  onSubmit = async () => {
    this.setState({
      word: '',
      wordError,
    });

    const { word } = this.state;
    const response = await this.props.mutate({
      variables: { word },
    });
    const { ok, errors, } = response.data.createWord;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
    console.log('res: ', response);
  };

  onChange = (e) => {
    console.log('onChange:', e.target.value);
    const { word, value } = e.target;
    this[word] = value;
  };

  render() {
    const { word, errors: { wordError, } } = this;

    const errorList = [];

    if (wordError) {
      errorList.push(wordError);
    }

    return (
      <Container text>
        <Header as="h2">Create Word</Header>
        <Form>
          <Form.Field error={!!wordError}>
            <Input name="word" onChange={this.onChange} placeholder="Word" value={word} fluid />
          </Form.Field>
          <Button onClick={this.onSubmit}>Save</Button>
        </Form>
        {errorList.length ? (
          <Message error header="There was some errors with your submission" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

const createWord = gql`
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

export default graphql(createWord)(observer(CreateWord));
