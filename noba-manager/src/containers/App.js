import React, { Component } from 'react';
import './App.css'
import Upload from './Upload'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Manager">
            <p>NOBA</p>
            <p>manager side</p>
          </div>
        </header>
        <Upload></Upload>
      </div>
    );
  }
}

export default App;
