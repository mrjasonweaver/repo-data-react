import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <TextField
              hintText="Facebook"
              floatingLabelText="Github Username"
            />
            <TextField
              hintText="React"
              floatingLabelText="Repo Name"
            />
            <RaisedButton label="Get issues" primary={true} />
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
