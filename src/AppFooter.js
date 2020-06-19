import React, { Component } from "react";
import jklogo from "./images/titleGraphicWithLogoOPTIMIZED.svg";

class AppFooter extends Component {
  render = () => {
    return (
      <footer className="App-footer">
        <img id="jk-logo" src={jklogo} alt="Jeff King" />
        <div>
          <a href="https://github.com/jazfunk">GitHub</a>
          &nbsp;|&nbsp;
          <a href="https://www.linkedin.com/in/jeffking222/">LinkedIn</a>
          &nbsp;|&nbsp;
          <a href="https://www.jeff-king.net/">Website</a>
        </div>
      </footer>
    );
  }
}

export default AppFooter;
