import React from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import template from './template.jsx';

const root = 'https://api.github.com';

export default class RepoIssues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      username: 'facebook',
      repo: 'react',
      loading: false

    }
  }

  async getIssues() {
    this.setState({issues: []});
    this.setState({loading: true});
      try {
        let response = await fetch(`${root}/repos/${this.state.username}/${this.state.repo}/issues`);
        let data = await response.json();
        let issuesWithComments = data.filter(x => x.comments > 1);
        this.setState({loading: false});
        return this.renderIssues(issuesWithComments);
      } catch(error) {
        console.error(error);
      }
  }

  renderIssues(data) {
    let issues = data.map(issue => {
      return(
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
      )
    });
    this.setState({issues});
  }

  contentContainer() {
    if (this.state.issues.length && !this.state.loading) {
      return this.state.issues;
    } else if (this.state.loading) {
      return (
        <CircularProgress size={80} thickness={5} />
      )
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getIssues();
  }

  handleChange = (e) => {
    let un = new RegExp(/Username/, 'g');
    un.test(e.target.id) ? this.setState({username: e.target.value}) : this.setState({repo: e.target.value});
  }

  render() {
    const props = {
        handleSubmit: this.handleSubmit,
        handleChange: this.handleChange,
        username: this.state.username,
        repo: this.state.repo,
        contentContainer: this.contentContainer()
    }
    return template(props);
  }
}