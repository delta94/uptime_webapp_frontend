import React, { Component } from "react";
import { Card } from "semantic-ui-react";

export default class PossibilityAcceptOrRejectButtons extends Component {
  render() {
    const { handleAcceptorReject, start } = this.props;

    return (
      <React.Fragment>
        <Card.Content>
          <button
            onClick={suggestedPossibility => {
              start();
              handleAcceptorReject("Accepted");
            }}
            className="ui basic button"
          >
            Accept this Activity
          </button>
        </Card.Content>
        <Card.Content>
          <button
            onClick={suggestedPossibility => handleAcceptorReject("Rejected")}
            className="ui basic button"
          >
            Reject this Activity and Suggestion Another
          </button>
        </Card.Content>
        <Card.Content>
          <button
            onClick={suggestedPossibility =>
              handleAcceptorReject("Rejected and Excluded")
            }
            className="ui basic button"
          >
            Never Show this Activity Again
          </button>
        </Card.Content>
      </React.Fragment>
    );
  }
}
