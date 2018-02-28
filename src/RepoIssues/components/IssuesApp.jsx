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
  const type = selectedIssueData.isPR ? "Pull Request" : "Issue";
  const isDisabled = !selectedIssueUrl ? true : false;

  const styles = {
    icon: {
      width: '20px',
      marginTop: '-1px'
    }
  }

  // const issuesFiled = issues.filter(x => !x.issueData.isPR);
  // const prsFiled = issues.filter(x => x.issueData.isPR);

  return (
    <MuiThemeProvider>
        <div className="App">
          <header className="App-wrap App-header">
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
          <div className="App-wrap App-header">
            <RaisedButton
                  disabled={isDisabled}
                  onClick={toggleIssueDetails}
                  label={`View ${type} ${issueNumber} Details`}
                  labelPosition="after"
                  primary={true}
                  icon={<Visibility style={styles.icon} />} />
          </div>
          <div className="App-wrap">
            <List className="issue-list">
              <Subheader>The latest <strong>{username}/{repo}</strong> repo PRs and issues with comments</Subheader>
              <IssueList 
                issues={issues}
                loading={loading}
                selectedIssueUrl={selectedIssueUrl}
                onIssueSelect={onIssueSelect}
                selectedIssueData={selectedIssueData} />
            </List>
          </div>
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