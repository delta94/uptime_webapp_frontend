import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import PossibilityAcceptOrRejectButtons from "./PossibilityAcceptOrRejectButtons";
import CompletePossibilityButtons from "./CompletePossibilityButtons";
import RatePossibility from "./RatePossibility";
import { baseUrl } from "../constants";

export default class PossibilityDisplay extends Component {
  state = {
    totalTime: 0,
    seconds: "00", // responsible for the seconds
    minutes: "0", // responsible for the minutes
    rating: null
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

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      // Fetch user information
      fetch(
        baseUrl + `/possibilityaverage/${this.props.suggestedPossibility.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then(res => res.json())
        .then(rating => {
          console.log(rating);
          this.setState({ rating });
        })
        .catch(e => console.error(e));
    }
  }

  render() {
    const { totalTime, seconds, minutes, rating } = this.state;

    const {
      suggestedPossibility,
      handleAcceptorReject,
      currentActivity,
      handleCompleteActivity,
      handleRatePossibility,
      handleSubmitPossibilityForm
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
        <Card.Content>{rating}</Card.Content>

        {!currentActivity ? (
          <Card.Content>
            <PossibilityAcceptOrRejectButtons
              handleAcceptorReject={handleAcceptorReject}
              start={this.start}
              tick={this.tick}
            />
          </Card.Content>
        ) : (
          <button
            className="ui basic button suggest-activity"
            onClick={() => handleSubmitPossibilityForm()}
          >
            Suggest Another Activity
          </button>
        )}

        {currentActivity && currentActivity.status === "Accepted" ? (
          <Card.Content>
            <CompletePossibilityButtons
              handleCompleteActivity={handleCompleteActivity}
              stop={this.stop}
              totalTime={totalTime}
              seconds={seconds}
              minutes={minutes}
            />
          </Card.Content>
        ) : null}
        {currentActivity &&
        currentActivity.status === "Accepted and Completed" ? (
          <React.Fragment>
            <Card.Content>
              <RatePossibility handleRatePossibility={handleRatePossibility} />
            </Card.Content>
            <Card.Content>
              <button
                className="ui basic button suggest-activity"
                onClick={() => handleSubmitPossibilityForm()}
              >
                Suggest Another Activity
              </button>
            </Card.Content>
          </React.Fragment>
        ) : null}
      </Card>
    );
  }
}
