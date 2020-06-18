import React, {Component} from 'react'
import jklogo from "./images/titleGraphicWithLogoOPTIMIZED.svg"

class AppFooter extends Component {
  render() {
    return (
      <footer className="App-footer">
        <img src={jklogo} alt="Jeff King" />
      </footer>
    )
  }
}

export default AppFooter