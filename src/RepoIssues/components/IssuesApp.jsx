import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IssueList from './IssueList';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar'

const IssuesApp = props => {
  const {
    issues,
    loading,
    handleSubmit,
    handleChange,
    onIssueSelect,
    toggleIssueDetails,
    username,
    repo,
    selectedIssueData,
    selectedIssueUrl,
    issueDetailsOpen
  } = props;

  const attrs = {};
  // conditional for adding disabled attrs
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
              onClick={toggleIssueDetails}
              label={`View Issue Details`}
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
          <Drawer width={600} openSecondary={true} open={issueDetailsOpen} >
            <AppBar 
              title="Issue Details"
              onClick={toggleIssueDetails}
              iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            />
              <div style={{ margin: '20px'}}>
                <h4>Issue Number {selectedIssueData.number}</h4>
                <h5>Created on {selectedIssueData.created_at}</h5>
                <p>{selectedIssueData.body}</p>
              </div>
              <RaisedButton
                style={{ margin: '20px' }}
                href={selectedIssueUrl}
                target="_blank"
                label={`View Issue ${selectedIssueData.number} on Github`}
                labelPosition="after"
                icon={<RemoveRedEye />} />
          </Drawer>
        </div>
      </MuiThemeProvider>
  )
}

export default IssuesApp;