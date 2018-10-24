import React, { Component } from "react";
import { Card, Rating } from "semantic-ui-react";

export default class RatePossibility extends Component {
  state = {};

  handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating });

  render() {
    const { handleRatePossibility } = this.props;
    return (
      <div>
        <Rating maxRating={5} onRate={this.handleRate} />
      </div>
    );
  }
}
