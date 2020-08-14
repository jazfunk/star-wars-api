import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import CharactersTable from "./CharactersTable";
import axios from "axios";

class CharactersComponent extends Component {
  PEOPLE_URL = "https://swapi.dev/api/people/";
  SEARCH_URL = "https://swapi.dev/api/people/?search=";

  constructor(props) {
    super(props);
    this.state = {
      peopleURL: this.PEOPLE_URL,
      searchPhrase: "",
      nextURL: "",
      prevURL: "",
      characters: [],
      characterCount: 0,
      species: [],
      homeworlds: []
    };
  }

  componentDidMount = () => {
    axios
      .get(this.state.peopleURL)
      .then(async (response) => {
        for (let i = 0; i < response.data.results.length; i++) {
          const character = response.data.results[i];
          
          character.homeworld = await this.getData(character.homeworld);
          character.species = character.species.length === 0 
            ? { name: ""} 
            : await this.getData(character.species[0]);
        }

        this.setState({
          characters: response.data.results,
          nextURL: this.secureURL(response.data.next),
          prevURL: this.secureURL(response.data.previous),
          characterCount: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  getHomeworlds = (url) => {
    // check to see if this url is already in homeworlds (state)
    // If so, return that homeworld
    // else, maake http request for that home world
      // when that hw comes back, store it in this.state.homeworlds
  }

  getData = (url) => {
    return axios.get(url)
    .then(response => response.data)
  }

  handleChange = (event) => {
    this.setState({
      searchPhrase: event.target.value,
    });
  };

  handleSearch = (event) => {
    this.setState({
      peopleURL: `${this.SEARCH_URL}${this.state.searchPhrase}`,
    });
  };

  handleClear = () => {
    if (this.state.searchPhrase) {
      this.setState({
        peopleURL: this.PEOPLE_URL,
        searchPhrase: "",
      });
    }
  };

  secureURL = (unsecureURL) => unsecureURL 
    ? `${unsecureURL.slice(0, 4)}s${unsecureURL.slice(4)}` 
    : unsecureURL;

  handleNext = () => {
    if (this.state.nextURL) {
      this.setState({
        peopleURL: this.state.nextURL,
      });
    }
  };

  handlePrevious = () => {
    if (this.state.prevURL) {
      this.setState({
        peopleURL: this.state.prevURL,
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.peopleURL !== this.state.peopleURL) {
      axios
        .get(this.state.peopleURL)
        .then(async (response) => {   
        for (let i = 0; i < response.data.results.length; i++) {
          const character = response.data.results[i];
          
          character.homeworld = await this.getData(character.homeworld);
          character.species = character.species.length === 0 
            ? { name: ""} 
            : await this.getData(character.species[0]);

        }
          this.setState({
            characters: response.data.results,
            nextURL: this.secureURL(response.data.next),
            prevURL: this.secureURL(response.data.previous),
            characterCount: response.data.count,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {  
    const totalPages = Math.ceil(this.state.characterCount/10)
    const urlFullPath = this.state.peopleURL
    const urlPageNumber = urlFullPath.slice(urlFullPath.length - 1)
    let pageNumber = parseInt(urlPageNumber)
    
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
            className="btn-secondary"
            onClick={this.handleSearch}
          >
            Search
          </Button>
          &nbsp;
          <Button
            id="btn-clear"
            className="btn-info"
            onClick={this.handleClear}
          >
            Clear
          </Button>
          &nbsp;
          <Button id="btn-prev" onClick={this.handlePrevious}>
            {`<Prev`}
          </Button>
          &nbsp;
          <Button id="btn-next" onClick={this.handleNext}>
            {`Next>`}
          </Button>
        </div>
        <br></br>
        <CharactersTable characters={this.state.characters} />
        <div className="record-count-display">
          {`(${this.state.characterCount} Characters) - Page ${pageNumber} of ${totalPages}`}
        </div>
      </div>
    );
  }
}

export default CharactersComponent;