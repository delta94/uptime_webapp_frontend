import React, { Component } from "react";
import { Card, Statistic, Rating } from "semantic-ui-react";

export default class UserStatistics extends Component {
  render() {
    const { userStats, suggestedPossibility } = this.props;
    let { average, acceptance_percentage, accepted, rejected } = userStats;

    return (
      <Card.Content>
        <Card.Description>
          {!average && suggestedPossibility
            ? "You have not yet rated this activity."
            : null}
        </Card.Description>

        {average ? (
          <Statistic>
            <Statistic.Label>Your Average Rating</Statistic.Label>

            <Statistic.Value>
              {parseInt(average)} {parseInt(average) === 1 ? "Star" : "Stars"}
            </Statistic.Value>

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
