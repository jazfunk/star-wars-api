import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import CharactersTable from "./CharactersTable";
import axios from "axios";

class CharactersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleURL: "https://swapi.dev/api/people/",
      searchPhrase: "",
      nextURL: "",
      prevURL: "",
      characters: [],
      characterCount: 0,
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
          characterCount: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({
      searchPhrase: event.target.value,
    });
  };

  handleSearch = (event) => {
    const searchBaseURL = "https://swapi.dev/api/people/?search=";
    const newPeopleURL = `${searchBaseURL}${this.state.searchPhrase}`;
    this.setState({
      peopleURL: newPeopleURL,
    });
  };

  handleClear = (event) => {
    let searchText = this.state.searchPhrase;
    if (searchText) {
      this.setState({
        peopleURL: "https://swapi.dev/api/people/",
        searchPhrase: "",
      });
    }
  };

  secureURL = (unsecureURL) =>
    `${unsecureURL.slice(0, 4)}s${unsecureURL.slice(4)}`;

  handleNext = () => {
    let unsecureURL = this.state.nextURL;
    if (unsecureURL) {
      this.setState({
        peopleURL: this.secureURL(unsecureURL),
      });
    }
  };

  handlePrevious = () => {
    let unsecureURL = this.state.prevURL;
    if (unsecureURL) {
      this.setState({
        peopleURL: this.secureURL(unsecureURL),
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.peopleURL !== this.state.peopleURL) {
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
  };

  render() {  
    const totalPages = Math.ceil(this.state.characterCount/10)
    const url = this.state.peopleURL
    const urlEnd = url.slice(url.length - 1)
    let pageNumber
    try {
      pageNumber = parseInt(urlEnd)
    } catch (error) {
      pageNumber = 1
    }

    if(isNaN(pageNumber)) {
      pageNumber = 1
    }

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
          />
          &nbsp;
          <Button
            id="btn-search"
            className="btn-info"
            onClick={this.handleSearch}
          >
            Search
          </Button>
          &nbsp;
          <Button
            id="btn-clear"
            className="btn-danger"
            onClick={this.handleClear}
          >
            Clear
          </Button>
          &nbsp;
          <Button id="btn-prev" onClick={this.handlePrevious}>
            Prev
          </Button>
          &nbsp;
          <Button id="btn-next" onClick={this.handleNext}>
            Next
          </Button>
        </div>
        <div className="record-count-display">
          {`Page ${pageNumber} of ${totalPages} - (${this.state.characterCount} Characters)`}
        </div>
        <CharactersTable characters={this.state.characters} />
      </div>
    );
  }
}

export default CharactersComponent;