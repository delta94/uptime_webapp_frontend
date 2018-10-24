import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import PossibilityAcceptOrRejectButtons from "./PossibilityAcceptOrRejectButtons";
import CompletePossibilityButtons from "./CompletePossibilityButtons";
import RatePossibility from "./RatePossibility";

export default class PossibilityDisplay extends Component {
  state = {
    totalTime: 0,
    seconds: "00", // responsible for the seconds
    minutes: "00" // responsible for the minutes
  };

  interval;

  start = () => {
    this.interval = setInterval(this.tick, 1000);
  };

  stop = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    let min = Math.floor(this.state.totalTime / 60);
    let sec = this.state.totalTime - min * 60;

    this.setState({ seconds: sec, minutes: min });

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      });
    } else {
      this.setState({
        seconds: sec
      });
    }
    if (min < 10) {
      this.setState({
        value: "0" + min
      });
    } else {
      this.setState({
        minutes: min
      });
    }
    this.state.totalTime++;
  };
  render() {
    const { totalTime, seconds, minutes } = this.state;

    const {
      suggestedPossibility,
      handleAcceptorReject,
      currentActivity,
      handleCompleteActivity,
      handleRatePossibility
    } = this.props;
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
        {!currentActivity ? (
          <PossibilityAcceptOrRejectButtons
            handleAcceptorReject={handleAcceptorReject}
            start={this.start}
            tick={this.tick}
          />
        ) : null}

        {currentActivity && currentActivity.status === "Accepted" ? (
          <CompletePossibilityButtons
            handleCompleteActivity={handleCompleteActivity}
            stop={this.stop}
            totalTime={totalTime}
            seconds={seconds}
            minutes={minutes}
          />
        ) : null}
        {currentActivity &&
        currentActivity.status === "Accepted and Completed" ? (
          <RatePossibility handleRatePossibility={handleRatePossibility} />
        ) : null}
      </Card>
    );
  }
}
