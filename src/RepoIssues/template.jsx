import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IssueList from './IssueList';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'

export default (props) => {
  const {
    issues,
    loading,
    handleSubmit,
    handleChange,
    onIssueSelect,
    username,
    repo, 
    selectedIssueUrl,
    selectedIssueId
  } = props;

  const attrs = {};
  // conditional for add disabled attrs
  if (!selectedIssueUrl) attrs['disabled'] = 'disabled';
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
              <RaisedButton label="Get issues" secondary={true} type="submit" />
            </form>
          </header>
          <RaisedButton
              {...attrs}
              href={selectedIssueUrl}
              target="_blank"
              label={`View Issue ${selectedIssueId} on Github`}
              labelPosition="after"
              primary={true}
              icon={<RemoveRedEye />} />
          <List className="issue-list">
            <Subheader>The latest <strong>{username}/{repo}</strong> Github repo PRs & issues with comments</Subheader>
            <IssueList 
              issues={issues}
              loading={loading}
              selectedIssueUrl={selectedIssueUrl}
              onIssueSelect={onIssueSelect} />
          </List>
        </div>
      </MuiThemeProvider>
  )
}