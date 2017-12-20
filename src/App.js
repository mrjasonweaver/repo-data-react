import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
          <RaisedButton label="Get issues with comments" primary={true} />
          </header>
          <p className="App-intro">
            Issues here
          </p>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
