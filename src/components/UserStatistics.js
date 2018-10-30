import React, { Component } from "react";
import { Card, Statistic, Rating } from "semantic-ui-react";

export default class UserStatistics extends Component {
  render() {
    const { userStats, suggestedPossibility } = this.props;
    const { average, acceptance_percentage, accepted, rejected } = userStats;
    return (
      <Card.Content>
        {!average && suggestedPossibility
          ? "You have not yet rated this activity."
          : null}

        {average ? (
          <Statistic>
            <Statistic.Label>Your Average Rating</Statistic.Label>
            <Statistic.Value>{parseInt(average)} Stars</Statistic.Value>
            <Statistic.Label>
              <Rating
                defaultRating={parseInt(average)}
                maxRating={5}
                disabled
              />
            </Statistic.Label>

            <Statistic.Label>For this Activity</Statistic.Label>
          </Statistic>
        ) : null}
        {acceptance_percentage ? (
          <Statistic>
            <Statistic.Label>Your Acceptance Rate</Statistic.Label>
            <Statistic.Value>
              {parseInt(acceptance_percentage) + "%"}
            </Statistic.Value>
            <Statistic.Label>For this Activity</Statistic.Label>
          </Statistic>
        ) : null}
      </Card.Content>
    );
  }
}
