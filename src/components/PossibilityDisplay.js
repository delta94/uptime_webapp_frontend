import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export default class PossibilityDisplay extends Component {
  render() {
    const { suggestedPossibility, handleAcceptorReject } = this.props;
    const {
      name,
      description,
      physical_intensity,
      mental_intensity,
      fun_index,
      duration_in_minutes,
      necessary_location,
      others_required
    } = suggestedPossibility;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          Physical Intensity: {physical_intensity}, Mental Intensity:{" "}
          {mental_intensity}, Fun Index: {fun_index} <br />
          {duration_in_minutes ? (
            <React.Fragment>
              <br /> Duration: {duration_in_minutes} minutes{" "}
            </React.Fragment>
          ) : null}
          {necessary_location ? (
            <React.Fragment>
              Necessary Location: {necessary_location}{" "}
            </React.Fragment>
          ) : null}
          {others_required ? (
            <React.Fragment>
              <br /> This activity requires others
            </React.Fragment>
          ) : null}{" "}
        </Card.Content>
        <Card.Content>
          <button
            onClick={suggestedPossibility => handleAcceptorReject("Accepted")}
            className="ui basic button"
          >
            Accept this Activity
          </button>
          <button
            onClick={suggestedPossibility => handleAcceptorReject("Rejected")}
            className="ui basic button"
          >
            Reject this Activity
          </button>
          <button
            onClick={suggestedPossibility =>
              handleAcceptorReject("Rejected and Excluded")
            }
            className="ui basic button"
          >
            Never Show this Activity Again
          </button>
        </Card.Content>
      </Card>
    );
  }
}
