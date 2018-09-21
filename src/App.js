import React, { Component } from 'react';
import logo from './static/img/index3.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="loading" alt="logo" />
          <h1 className="App-title">Welcome aboard!</h1>
        </header>
      </div>
    );
  }
}

export default App;
