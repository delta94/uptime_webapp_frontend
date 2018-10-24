import React, { Component } from "react";

export default class Timer extends React.Component {
  render() {
    const { totalTime, seconds, minutes } = this.props;
    return (
      <div>
        <h1 style={{ fontSize: 75 }}>
          {minutes}:{seconds}
        </h1>
      </div>
    );
  }
}
