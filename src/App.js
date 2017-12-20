import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
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
            <ListItem 
              key={issue.id}  
              className={`id-${issue.id}`}
              primaryText={issue.title}
              leftAvatar={<Avatar src={issue.user.avatar_url} />}
              rightIcon={<CommunicationChatBubble />}>
            </ListItem>
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
          <List className="issue-list">
           {this.state.issues}
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
