import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const root = 'https://api.github.com';
let username = 'facebook';
let repo = 'react'; 
let params = `${username}/${repo}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      issues: []
    }
  }

  componentDidMount() {
    fetch(`${root}/repos/${params}/issues`)
      .then(response => response.json())
      .then(data => {
        let issues = data.map(issue => {
          return(
            <li key={issue.id}  className={`id-${issue.id}`}>
              <span>{issue.title}</span>
            </li>
          )
        });
        this.setState({issues: issues});
        console.log("state", this.state.issues);
      }).catch( error => console.error(error));
  }

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
          <ul className="issue-list">
           {this.state.issues}
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
