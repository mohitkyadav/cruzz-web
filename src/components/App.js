import React, { Component } from 'react';
import logo from '../static/img/index3.svg';
import '../static/css/style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="loading" alt="logo" />
          <h1 className="App-title">Welcome aboard!</h1>
          <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-push">Push</button>
          <div id="offcanvas-push" uk-offcanvas="mode: push; overlay: true">
          <div class="uk-offcanvas-bar">

            <button class="uk-offcanvas-close" type="button" uk-close></button>

            <h3>Title</h3>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

           </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
