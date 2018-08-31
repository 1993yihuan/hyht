import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./index.less";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to hyht</h1>
        </header>
        <p className="App-intro">
          纯净的React+less模板
        </p>
      </div>
    );
  }
}

export default App;
