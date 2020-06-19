import React, { Component } from "react";
import logo from "./logo.svg";

class AppHeader extends Component {
  render = () => {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        STAR WARS API
      </header>
    );
  }
}

export default AppHeader;