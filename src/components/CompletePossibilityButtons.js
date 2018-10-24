import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Timer from "./Timer";

export default class CompletePossibilityButtons extends Component {
  render() {
    const {
      handleAcceptorReject,
      handleCompleteActivity,
      stop,
      totalTime,
      seconds,
      minutes
    } = this.props;
    return (
      <React.Fragment>
        <Card.Content>
          <Card.Description>Okay, now get busy!</Card.Description>
        </Card.Content>
        <Card.Content>
          <Timer totalTime={totalTime} seconds={seconds} minutes={minutes} />
        </Card.Content>
        <Card.Content>
          <button
            onClick={() => {
              handleCompleteActivity("Accepted and Completed", totalTime);
              stop();
            }}
            className="ui basic button"
          >
            I completed this activity
          </button>
          <button
            onClick={() => {
              handleCompleteActivity("Accepted but Not Completed", totalTime);
              stop();
            }}
            className="ui basic button"
          >
            I did not complete this activity
          </button>
        </Card.Content>
      </React.Fragment>
    );
  }
}
