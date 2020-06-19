import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class AppHeader extends Component {
  render() {
    return (
      <header>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          STAR WARS API
        </div>
      </header>
    );
  }
}

export default AppHeader;
