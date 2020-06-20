import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import CharactersTable from "./CharactersTable";
import axios from "axios";

class CharactersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleURL: "https://swapi.dev/api/people/",
      searchPhrase: '',
      nextURL: '',
      prevURL: '',
      characters: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(this.state.peopleURL)
      .then((response) => {
        this.setState({ 
          characters: response.data.results,
          nextURL: response.data.next,
          prevURL: response.data.previous,
         });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      searchPhrase: event.target.value,
    })
  }

  handleSearch = (event) => {
    event.preventDefault();
    const searchBaseURL = 'https://swapi.dev/api/people/?search='
    const newPeopleURL = `${searchBaseURL}${this.state.searchPhrase}`
    this.setState({
      peopleURL: newPeopleURL,
    })    
  }

  handleNext = (event) => {
    console.log("next button clicked")
  }

  handlePrevious = (event) => {
    console.log("prev button clicked")
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.peopleURL !== this.state.peopleURL) {
      console.log(this.state.peopleURL)
      axios
      .get(this.state.peopleURL)
      .then((response) => {
        this.setState({ 
          characters: response.data.results,
          nextURL: response.data.next,
          prevURL: response.data.previous,
         });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <div>
        <div className="form-container">
          <input 
            id="search-text" 
            type="text" 
            className="form-control" 
            placeholder="Search People" 
            value={this.state.searchPhrase}
            onChange={this.handleChange}
            required={true}
          />&nbsp;
          <Button id="btn-search" className="btn-info" onClick={this.handleSearch}>Search</Button>&nbsp;
          <Button id="btn-prev" onClick={this.handlePrevious}>Prev</Button>&nbsp;
          <Button id="btn-next" onClick={this.handleNext}>Next</Button>
        </div>
        <br></br>
        <CharactersTable characters={this.state.characters} />
      </div>
    );
  }
}
export default CharactersComponent;