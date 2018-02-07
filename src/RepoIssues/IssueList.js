import React from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import {pink400} from 'material-ui/styles/colors';

const IssueList = props => {
  const {issues, loading, selectedIssueUrl, onIssueSelect } = props;
  if (!loading) {
    return (
      <div className="issueContainer">
        {issues.map(issue =>
          <div 
            key={issue.id} 
            data-htmlurl={issue.html_url}
            data-issueid={issue.id}
            onClick={onIssueSelect}>
            <ListItem
              className={`id-${issue.id}`}
              primaryText={issue.title}
              secondaryText={
                <p>{issue.user.login} -- {issue.comments} Comments</p>
              }
              secondaryTextLines={1}
              leftAvatar={<Avatar src={issue.user.avatar_url} />}
              rightIcon={selectedIssueUrl === issue.html_url ? <CheckCircle color={pink400} /> : null}>
            </ListItem>
            <Divider inset={true} />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <CircularProgress size={80} thickness={5} />
    );
  }
}

export default IssueList;