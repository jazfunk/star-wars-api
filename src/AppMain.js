import React, { Component } from "react";
import Characters from './CharactersComponent'

class AppMain extends Component {
  render = () => {
    return (
      <main className="App-main">
        <Characters />
      </main>
    );
  };
}

export default AppMain;
