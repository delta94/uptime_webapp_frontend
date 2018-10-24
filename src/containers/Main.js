import React, { Component } from "react";
import { Card, Icon } from "semantic-ui-react";
import PossibilityForm from "../components/PossibilityForm.js";
import PossibilityDisplay from "../components/PossibilityDisplay";
import { baseUrl } from "../constants";

export default class Main extends Component {
  state = {
    user: "",
    formToDisplay: "",
    suggestedPossibility: "",
    currentActivity: "",
    allPossibilities: "",
    incompleteForm: false
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      // Fetch user information
      fetch(baseUrl + "/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ user: data });
        })
        .catch(e => console.error(e));
    }
  }

  displayPossibilityForm = () => {
    this.setState({ formToDisplay: "Possibility Form" });
  };

  handleSubmitPossibilityForm = (location, timeLimit) => {
    if (!location || !timeLimit) {
      this.setState({ incompleteForm: true });
    } else {
      this.setState({ incompleteForm: false });
      let data = {
        location: location,
        timeLimit: timeLimit
      };
      let token = localStorage.getItem("token");
      if (token) {
        // Fetch random possibility
        fetch(baseUrl + "/suggestpossibility", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(possibility => {
            this.setState({ suggestedPossibility: possibility });
          })
          .catch(e => alert(e));
      }
    }
  };

  handleFetchAllPossibilities = () => {
    let token = localStorage.getItem("token");
    if (token) {
      // Fetch random possibility
      fetch(baseUrl + "/possibilities", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(possibilities => {
          this.setState({ allPossibilities: possibilities });
        })
        .catch(e => alert(e));
    }
  };

  handleAcceptorReject = status => {
    let data = {
      status,
      possibility: this.state.suggestedPossibility
    };
    let token = localStorage.getItem("token");
    if (token) {
      // Create Activity
      fetch(baseUrl + "/activities", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(activityOrPossibility => {
          if (activityOrPossibility.status) {
            this.setState({ activityOrPossibility });
          }
          if (!activityOrPossibility.status) {
            this.setState({ suggestedPossibility: activityOrPossibility });
          }
        })
        .catch(e => alert(e));
    }
  };

  render() {
    let {
      user,
      formToDisplay,
      incompleteForm,
      suggestedPossibility
    } = this.state;
    return (
      <React.Fragment>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {user.first_name} {user.last_name}
            </Card.Header>
            <Card.Description>Username: {user.username}</Card.Description>
            <Card.Description>Email: {user.email}</Card.Description>
          </Card.Content>
          {formToDisplay === "" ? (
            <button
              onClick={this.displayPossibilityForm}
              className="ui basic button"
            >
              Let UpTime Suggest an Activity
            </button>
          ) : null}
        </Card>
        {formToDisplay === "Possibility Form" ? (
          <PossibilityForm
            handleSubmitPossibilityForm={this.handleSubmitPossibilityForm}
            error={incompleteForm}
          />
        ) : null}
        {suggestedPossibility ? (
          <PossibilityDisplay
            suggestedPossibility={suggestedPossibility}
            handleAcceptorReject={this.handleAcceptorReject}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
