import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
// import {autobind} from 'core-decorators'

const root = 'https://api.github.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      username: 'facebook',
      repo: 'react'

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getIssues() {
    fetch(`${root}/repos/${this.state.username}/${this.state.repo}/issues`)
      .then(response => response.json())
      .then(data => {
        let issuesWithComments = data.filter(x => x.comments > 1);
        let issues = issuesWithComments.map(issue => {
          return(
            <div key={issue.id}>
              <ListItem 
                href={issue.html_url}
                className={`id-${issue.id}`}
                primaryText={issue.title}
                secondaryText={
                  <p>{issue.user.login} -- {issue.comments} Comments</p>
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

  // @autobind
  handleSubmit(e) {
    e.preventDefault();
    this.getIssues();
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <form onSubmit={this.handleSubmit}>
              <TextField
                value={this.state.username}
                onChange={this.handleChange}
                hintText="Facebook"
                floatingLabelText="Github Username"
              />
              <TextField
                value={this.state.repo}
                onChange={this.handleChange}
                hintText="React"
                floatingLabelText="Repo Name"
              />
              <RaisedButton label="Get issues" primary={true} type="submit" />
            </form>
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
