import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IssueList from './IssueList';

export default (props) => {
  const {
    issues,
    loading,
    handleSubmit,
    handleChange,
    username,
    repo
  } = props;

  return (
    <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <form onSubmit={handleSubmit}>
              <TextField
                value={username}
                onChange={handleChange}
                hintText="facebook"
                floatingLabelText="Github Username"
              />
              <TextField
                value={repo}
                onChange={handleChange}
                hintText="react"
                floatingLabelText="Repo Name"
              />
              <RaisedButton label="Get issues" primary={true} type="submit" />
            </form>
          </header>
          <List className="issue-list">
            <Subheader>The latest <strong>{username}/{repo}</strong> Github repo PRs & issues with comments</Subheader>
            <IssueList issues={issues} loading={loading} />
          </List>
        </div>
      </MuiThemeProvider>
  )
}