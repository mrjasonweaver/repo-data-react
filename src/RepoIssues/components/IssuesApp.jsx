import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IssueList from './IssueList';
import IssueDetail from './IssueDetail';
import Visibility from 'material-ui/svg-icons/action/visibility';

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

  const issueNumber = selectedIssueData.number ? selectedIssueData.number : "";

  const isDisabled = !selectedIssueUrl ? true : false;

  const styles = {
    icon: {
      width: '20px',
      marginTop: '-1px'
    }
  }

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
              disabled={isDisabled}
              onClick={toggleIssueDetails}
              label={`View Issue ${issueNumber} Details`}
              labelPosition="after"
              primary={true}
              icon={<Visibility style={styles.icon} />} />
          <List className="issue-list">
            <Subheader>The latest <strong>{username}/{repo}</strong> Github repo PRs & issues with comments</Subheader>
            <IssueList 
              issues={issues}
              loading={loading}
              selectedIssueUrl={selectedIssueUrl}
              onIssueSelect={onIssueSelect} />
          </List>
          <IssueDetail 
            selectedIssueData={selectedIssueData}
            selectedIssueUrl={selectedIssueUrl}
            issueDetailsOpen={issueDetailsOpen}
            toggleIssueDetails={toggleIssueDetails}
          />
        </div>
      </MuiThemeProvider>
  )
}

export default IssuesApp;