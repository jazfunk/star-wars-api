import React, { Component } from "react";
import Characters from './CharactersComponent'
// import CharactersTable from "./CharactersTable";

class AppMain extends Component {
  render = () => {
    return (
      <main className="App-main">
        {/* <img id="main-image" src={DarthVaderSky} alt="Darth Vader Sky" /> */}
        <Characters />
      </main>
    );
  };
}

export default AppMain;
