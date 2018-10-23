import React, { Component } from "react";
import { Card, Form, Message } from "semantic-ui-react";

export default class PossibilityForm extends Component {
  state = { location: "", timeLimit: "" };

  handleLocationChange = (e, { value }) => this.setState({ location: value });

  handleTimeLimitChange = (e, { value }) => this.setState({ timeLimit: value });

  render() {
    const { location, timeLimit } = this.state;
    const { handleSubmitPossibilityForm, error } = this.props;

    return (
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Group inline>
              <label>Where are you?</label>
              <Form.Radio
                label="Home"
                value="Home"
                checked={location === "Home"}
                onChange={this.handleLocationChange}
              />
              <Form.Radio
                label="Work"
                value="Work"
                checked={location === "Work"}
                onChange={this.handleLocationChange}
              />
              <Form.Radio
                label="Somewhere Else"
                value="Somewhere Else"
                checked={location === "Somewhere Else"}
                onChange={this.handleLocationChange}
              />
            </Form.Group>
            <Form.Group inline>
              <label>How much time do you have?</label>
              <Form.Radio
                label="Less than 15 minutes"
                value="15"
                checked={timeLimit === "15"}
                onChange={this.handleTimeLimitChange}
              />
              <Form.Radio
                label="Between 15 and 30 minutes"
                value="15-30"
                checked={timeLimit === "15-30"}
                onChange={this.handleTimeLimitChange}
              />
              <Form.Radio
                label="More than 30 minutes"
                value="30+"
                checked={timeLimit === "30+"}
                onChange={this.handleTimeLimitChange}
              />
            </Form.Group>

            <Form.Button
              basic
              onClick={() => handleSubmitPossibilityForm(location, timeLimit)}
            >
              Suggest Activity
            </Form.Button>
          </Form>
          {error ? (
            <Message warning>
              <Message.Header>
                You must register before you can do that!
              </Message.Header>
              <p>Visit our registration page, then try again.</p>
            </Message>
          ) : null}
        </Card.Content>
      </Card>
    );
  }
}
