import React, {Component} from 'react'
import CharactersTable from './CharactersTable'
import axios from 'axios'

class CharactersComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: [],
    }
  }

  componentDidMount = () => {
    axios.get('https://swapi.dev/api/people/')
    .then(response => {
      // debugger
      console.log(response.data.results)
      this.setState({ characters: response.data.results})
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <CharactersTable characters={this.state.characters} />
      </div>
    )
  }
}
export default CharactersComponent
