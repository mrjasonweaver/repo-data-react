import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IssueList from './IssueList';
import IssueDetail from './IssueDetail';
import Visibility from 'material-ui/svg-icons/action/visibility';
import NewReleases from 'material-ui/svg-icons/av/new-releases';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';

const IssuesApp = props => {
  const {
    issues,
    pinnedIssue,
    loading,
    handleSubmit,
    handleChange,
    onIssueSelect,
    toggleIssueDetails,
    username,
    repo,
    selectedIssueData,
    selectedIssueUrl,
    selectedIssueId,
    currentPinnedId,
    issueDetailsOpen,
    filterValue,
    handleFilterChange,
    onTogglePinIssue
  } = props;

  const isDisabled = !selectedIssueUrl ? true : false;
  const isCurrentlyAPinnedIssue = pinnedIssue.length > 0;
  const isPinned = selectedIssueId == currentPinnedId && isCurrentlyAPinnedIssue;
  const isDisabledAndPinned = isDisabled || selectedIssueId != currentPinnedId && isCurrentlyAPinnedIssue;

  const styles = {
    icon: {
      width: '20px',
      marginTop: '-1px'
    }
  }

  return (
    <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <header className="App-wrap">
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
            <div className="App-wrap flex-wrap">
              <div>
                <Link to={`/issue/${selectedIssueId}`} >
                  <FlatButton
                        style={{}}
                        disabled={isDisabled}
                        onClick={toggleIssueDetails}
                        label={`View`}
                        labelPosition="after"
                        primary={true}
                        icon={<Visibility style={styles.icon} />} />
                  </Link>
                  <FlatButton
                      style={{}}
                      disabled={isDisabledAndPinned}
                      onClick={onTogglePinIssue}
                      label={isPinned ? "Unpin" : "Pin"}
                      labelPosition="after"
                      primary={true}
                      icon={<NewReleases style={styles.icon} />} />
                </div>
                <div>
                <DropDownMenu value={filterValue} onChange={handleFilterChange}>
                  <MenuItem value={1} primaryText="Issues and Pull Requests" />
                  <MenuItem value={2} primaryText="Issues only" />
                  <MenuItem value={3} primaryText="Pull Requests only" />
                </DropDownMenu>
              </div>
            </div>
          </div>
          <div className="App-wrap main-lists">
            <List className="issue-list">
              { pinnedIssue.length > 0 ? <Subheader>Pinned</Subheader> : null }
              <IssueList 
                issues={pinnedIssue}
                selectedIssueUrl={selectedIssueUrl}
                onIssueSelect={onIssueSelect}
                selectedIssueData={selectedIssueData} />
            </List>
            <List className="issue-list">
              <Subheader>The latest <strong>{username}/{repo}</strong> repo data with comments</Subheader>
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