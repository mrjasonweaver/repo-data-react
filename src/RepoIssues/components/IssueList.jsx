import React from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import {cyan400, grey200} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';

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
            data-issuedata={JSON.stringify(issue.issueData)}
            onClick={onIssueSelect}>
            <Link to="/" style={{textDecoration: "none"}}>
              <ListItem
                className={`id-${issue.id}`}
                primaryText={issue.title}
                secondaryText={
                  <p>{issue.user_login} -- {issue.comments} Comments</p>
                }
                secondaryTextLines={1}
                rightAvatar={<Avatar src={issue.user_avatar_url} />}
                leftIcon={selectedIssueUrl === issue.html_url ? <RadioButtonChecked color={cyan400} /> : <RadioButtonUnchecked color={grey200} />}>
              </ListItem>
            </Link>
            <Divider />
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