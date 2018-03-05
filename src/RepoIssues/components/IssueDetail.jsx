import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar'
import OpenInNew from 'material-ui/svg-icons/action/open-in-new'
import {Link} from 'react-router-dom';

const IssueList = props => {
  const {selectedIssueData, selectedIssueUrl, issueDetailsOpen, toggleIssueDetails} = props;
  const styles = {
    icon: {
      width: '16px',
      marginTop: '-1px'
    },
    body: {
      color: '#999',
      lineHeight: '1.5',
      fontSize: '14px'
    }
  }
  const type = selectedIssueData.isPR ? "Pull Request" : "Issue";
  return (
    <Drawer width={600} openSecondary={true} open={issueDetailsOpen} >
      <AppBar 
        title={`${type} Details`}
        onClick={toggleIssueDetails}
        iconElementLeft={<Link to="/"><IconButton><NavigationClose /></IconButton></Link>}
      />
      <div style={{ margin: '20px'}}>
        <h4>{type} Number {selectedIssueData.number}</h4>
        <h5>Created on {selectedIssueData.created_at}</h5>
        <p style={styles.body}>{selectedIssueData.body}</p>
      </div>
      <RaisedButton
        style={{ margin: '20px' }}
        href={selectedIssueUrl}
        target="_blank"
        label={`View ${type} ${selectedIssueData.number} on Github`}
        labelPosition="before"
        icon={<OpenInNew style={styles.icon} />} />
    </Drawer>
  )
}

export default IssueList;