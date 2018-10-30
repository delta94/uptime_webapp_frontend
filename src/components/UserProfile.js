import React, { Component } from "react";
import { Card } from "semantic-ui-react";
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

      <UserStatistics user={props.user} />
    </React.Fragment>
  );
}
