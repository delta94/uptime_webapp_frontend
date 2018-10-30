import React, { Component } from "react";
import { Card, Icon, Grid } from "semantic-ui-react";
import UserProfile from "../components/UserProfile";
import PossibilityForm from "../components/PossibilityForm.js";
import PossibilityDisplay from "../components/PossibilityDisplay";
import { baseUrl } from "../constants";

export default class Main extends Component {
  state = {
    user: "",
    userStats: {},
    userOverallStats: {},
    formToDisplay: "",
    location: "",
    timeLimit: "",
    suggestedPossibility: "",
    rating: null,
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

  handleSubmitPossibilityForm = (
    location = this.state.location,
    timeLimit = this.state.timeLimit
  ) => {
    if (!location || !timeLimit) {
      this.setState({ incompleteForm: true });
    } else {
      this.setState({
        incompleteForm: false,
        location,
        timeLimit,
        currentActivity: ""
      });
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
            this.fetchRating(possibility);
            this.fetchUserStats(possibility);
          })
          .catch(e => alert(e));
      }
    }
  };

  fetchRating = possibility => {
    console.log("fetching rating");
    let token = localStorage.getItem("token");
    if (token) {
      // Fetch user information
      fetch(baseUrl + `/possibilityaverage/${possibility.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(rating => {
          console.log(rating);
          this.setState({ rating });
        })
        .catch(e => console.error(e));
    }
  };

  fetchUserStats = possibility => {
    console.log("fetching stats");

    // For this possibility

    let token = localStorage.getItem("token");
    if (token) {
      // Fetch user stats
      fetch(baseUrl + `/userpossibilitystats/${possibility.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(userStats => {
          console.log(userStats);
          this.setState({ userStats });
        })
        .catch(e => console.error(e));
    }

    // For all possibilities
    fetch(baseUrl + `/useroverallstats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(userOverallStats => {
        console.log(userOverallStats);
        this.setState({ userOverallStats });
      })
      .catch(e => console.error(e));
  };

  handleAcceptorReject = status => {
    let data = {
      status,
      location: this.state.location,
      timeLimit: this.state.timeLimit,
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
            this.setState({ currentActivity: activityOrPossibility });
          }
          if (!activityOrPossibility.status) {
            this.setState({ suggestedPossibility: activityOrPossibility });
            this.fetchRating(activityOrPossibility);
            this.fetchUserStats(activityOrPossibility);
          }
        })
        .catch(e => alert(e));
    }
  };

  handleCompleteActivity = (status, time_expired) => {
    let data = {
      status,
      time_expired
    };
    let token = localStorage.getItem("token");
    if (token) {
      // Create Activity
      fetch(baseUrl + `/activities/${this.state.currentActivity.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(activity => {
          this.setState({ currentActivity: activity });
        })
        .catch(e => alert(e));
    }
  };

  handleRatePossibility = rating => {
    let data = {
      rating
    };
    let token = localStorage.getItem("token");
    if (token) {
      // Create Activity
      fetch(baseUrl + `/activities/${this.state.currentActivity.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(activity => {
          this.setState({ currentActivity: activity });
        })
        .catch(e => alert(e));
    }
  };

  updateLocation = location => {
    this.setState({ location });
  };

  updateTimeLimit = timeLimit => {
    this.setState({ timeLimit });
  };

  render() {
    let {
      user,
      userStats,
      userOverallStats,
      formToDisplay,
      incompleteForm,
      suggestedPossibility,
      currentActivity,
      rating
    } = this.state;
    return (
      <Grid columns={2} stretched>
        <Grid.Row stretched>
          <Grid.Column>
            {formToDisplay === "" ? (
              <button
                onClick={this.displayPossibilityForm}
                className="ui basic button"
              >
                Let UpTime Suggest an Activity
              </button>
            ) : null}
            {formToDisplay === "Possibility Form" ? (
              <PossibilityForm
                handleSubmitPossibilityForm={this.handleSubmitPossibilityForm}
                error={incompleteForm}
                suggestedPossibility={suggestedPossibility}
                updateLocation={this.updateLocation}
                updateTimeLimit={this.updateTimeLimit}
              />
            ) : null}
            {suggestedPossibility ? (
              <PossibilityDisplay
                suggestedPossibility={suggestedPossibility}
                handleAcceptorReject={this.handleAcceptorReject}
                currentActivity={currentActivity}
                handleCompleteActivity={this.handleCompleteActivity}
                handleRatePossibility={this.handleRatePossibility}
                handleSubmitPossibilityForm={this.handleSubmitPossibilityForm}
                rating={rating}
              />
            ) : null}
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <UserProfile
                user={user}
                userStats={userStats}
                userOverallStats={userOverallStats}
                suggestedPossibility={suggestedPossibility}
              />
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
