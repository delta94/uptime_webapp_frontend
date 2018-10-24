import React, { Component } from "react";
import { Card, Rating } from "semantic-ui-react";

export default class RatePossibility extends Component {
  state = {};

  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });
    this.props.handleRatePossibility(rating);
  };

  render() {
    return (
      <div>
        Rate this Activity:{" "}
        <Rating icon="star" maxRating={5} onRate={this.handleRate} />
      </div>
    );
  }
}
