import React from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

const IssueList = props => {
  const {issues, loading} = props;
  if (!loading) {
    return (
      <div className="issueContainer">
        {issues.map(issue =>
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