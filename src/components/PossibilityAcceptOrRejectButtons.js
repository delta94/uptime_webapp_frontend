import React, { Component } from "react";
import { Card } from "semantic-ui-react";

export default class PossibilityAcceptOrRejectButtons extends Component {
  render() {
    const { handleAcceptorReject } = this.props;
    return (
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
    );
  }
}
