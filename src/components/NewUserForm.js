import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";

export default class NewUserForm extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ experience: value });

  render() {
    let { handleCreateOrEditUser } = this.props;

    let token = localStorage.getItem("token");
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ui container">
        <Segment>
          <Form onSubmit={e => handleCreateOrEditUser(e)}>
            <Form.Group widths="equal">
              <Form.Input
                name="first_name"
                fluid
                label="First name"
                placeholder="First name"
              />
              <Form.Input
                name="last_name"
                fluid
                label="Last name"
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="username"
                fluid
                label="Username"
                placeholder="Username"
              />
              <Form.Input
                name="email"
                fluid
                label="Email Address"
                placeholder="Email
                Address"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="password"
                fluid
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Form.Group>

            <Button inverted secondary basic type="submit">
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
