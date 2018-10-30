import React, { Component } from "react";
import { Card, Statistic } from "semantic-ui-react";
import UserStatistics from "./UserStatistics";

export default function UserProfile(props) {
  return (
    <React.Fragment>
      <Card.Content>
        <Card.Header>
          {props.user.first_name} {props.user.last_name}
        </Card.Header>
        <Card.Description>Username: {props.user.username}</Card.Description>
        <Card.Description>Email: {props.user.email}</Card.Description>
      </Card.Content>
      <Card.Content>
        {props.userOverallStats.acceptance_percentage ? (
          <Statistic>
            <Statistic.Label>You Have Accepted</Statistic.Label>
            <Statistic.Value>
              {parseInt(props.userOverallStats.acceptance_percentage)}%
            </Statistic.Value>
            <Statistic.Label>Of All Possibilities</Statistic.Label>
          </Statistic>
        ) : null}
      </Card.Content>

      <UserStatistics
        user={props.user}
        userStats={props.userStats}
        suggestedPossibility={props.suggestedPossibility}
      />
    </React.Fragment>
  );
}
