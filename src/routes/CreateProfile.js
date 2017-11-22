import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { createProfileMutation } from '../graphql/user';

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      age: '',
      occupation: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { age, occupation } = this;
    const response = await this.props.mutate({
      variables: { age, occupation },
    });

    console.log('res: ', response);

    const {
      ok, errors,
    } = response.data.createProfile;

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
    const { age, occupation, errors: { profileError, } } = this;

    const errorList = [];

    if (profileError) {
      errorList.push(profileError);
    }

    return (
      <Container text>
        <Header as="h2">Create Profile</Header>
        <Form>
          <Form.Field error={!!profileError}>
            <Input name="age" onChange={this.onChange} placeholder="age" value={age} fluid />
          </Form.Field>
          <Form.Field error={!!profileError}>
            <Input name="occupation" onChange={this.onChange} placeholder="occupation" value={occupation} fluid />
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

export default graphql(createProfileMutation)(observer(CreateProfile));
