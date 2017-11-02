import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { createWord } from '../graphql/word';

class CreateWord extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      word: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { word } = this;
    const response = await this.props.mutate({
      variables: { word },
    });

    console.log('res: ', response);

    const {
      ok, errors,
    } = response.data.createWord;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = (e) => {
    console.log('onChange:', e.target.value);
    const { name, value } = e.target;
    this[name] = value;
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

export default graphql(createWord)(observer(CreateWord));
