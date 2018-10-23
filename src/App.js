import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";
import Main from "./containers/Main";
import { baseUrl } from "./constants";
import "./App.css";

class App extends Component {
  state = {
    displayNewUserForm: false,
    user: null
  };

  handleLogin = e => {
    e.preventDefault();

    let params = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
    };

    this.setState({ error: "" });

    fetch(baseUrl + "/login", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("token", data.token);

          this.setState({ error: "" });
        } else {
          this.setState({ error: "Invalid username or password" });
          alert("Invalid username or password");
        }
      });
  };

  handleLogout = () => {
    localStorage.clear();
  };

  createNewUser = () => {
    this.setState({
      displayNewUserForm: true,
      stage: "new_user"
    });
  };

  handleCreateUser = e => {
    e.preventDefault();

    let data = {
      user: {
        first_name: e.currentTarget.first_name.value,
        last_name: e.currentTarget.last_name.value,
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value
      }
    };

    fetch(baseUrl + "/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(newUser => {
        if (newUser.errors) {
          this.displayErrors(newUser.errors);
        } else {
          if (newUser.success) {
            localStorage.setItem("token", newUser.token);

            this.setState({
              error: "",
              displayNewUserForm: false,
              user: newUser.user
            });
          }
          window.history.back();
        }
      });
  };

  displayErrors = errors => {
    let errorlist = errors.map(error => {
      return `-${error} \n`;
    });
    alert(errorlist.join(" "));
  };

  render() {
    if (
      localStorage.getItem("token") &&
      (window.location.href.includes("map_splash") ||
        window.location.href.includes("login"))
    ) {
      return <Redirect to="/" />;
    }
    return (
      <div className="App">
        <header className="ui header segment">
          <div className="ui container">
            <NavBar
              displayNewUserForm={this.state.displayNewUserForm}
              createNewUser={this.createNewUser}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
            />
          </div>
        </header>
        <div className="ui container">
          <Route
            exact
            path="/new_user"
            render={routerProps => (
              <NewUserForm
                handleCreateOrEditUser={this.handleCreateUser}
                displayNewUserForm={this.state.displayNewUserForm}
              />
            )}
          />
          {localStorage.getItem("token") ? null : (
            <Route
              path="/login"
              render={routerProps => (
                <LoginForm
                  createNewUser={this.createNewUser}
                  handleLogin={this.handleLogin}
                />
              )}
            />
          )}
          {localStorage.getItem("token") ? (
            <Route path="/" render={routerProps => <Main />} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
