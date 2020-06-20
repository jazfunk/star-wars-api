import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import CharactersTable from "./CharactersTable";
import axios from "axios";

class CharactersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleURL: "https://swapi.dev/api/people/",
      characters: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(this.state.peopleURL)
      .then((response) => {
        // debugger
        console.log(response.data.results);
        this.setState({ characters: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="form-container">
          <input id="search-text" type="text" className="form-control" placeholder="Search People" />&nbsp;
          <Button className="btn-info" id="btn-search">Search</Button>&nbsp;
          <Button id="btn-prev">Prev</Button>&nbsp;
          <Button id="btn-next">Next</Button>
        </div>
        <br></br>
        <CharactersTable characters={this.state.characters} />
      </div>
    );
  }
}
export default CharactersComponent;
