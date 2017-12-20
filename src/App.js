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

class App extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      username: 'facebook',
      repo: 'react'

    }
  }

  componentDidMount() {
    fetch(`${root}/repos/${this.state.username}/${this.state.repo}/issues`)
      .then(response => response.json())
      .then(data => {
        let issues = data.filter(issue => issue.comments > 1).map(issue => {
          return(
            <div key={issue.id}>
              <ListItem 
                href={issue.html_url}
                className={`id-${issue.id}`}
                primaryText={issue.title}
                secondaryText={
                  <p>
                    <span>{issue.user.login}</span> -- {issue.comments} Comments
                  </p>
                }
                secondaryTextLines={1}
                leftAvatar={<Avatar src={issue.user.avatar_url} />}
                rightIcon={<CommunicationChatBubble />}>
              </ListItem>
              <Divider inset={true} />
            </div>
          )
        });
        this.setState({issues: issues});
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
            <Subheader>The latest {this.state.username}/{this.state.repo} Github repo PRs & issues with comments</Subheader>
           {this.state.issues}
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
