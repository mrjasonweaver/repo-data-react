import React from 'react';
import template from './template.jsx';
import RepoIssueService from './RepoIssueService';

export default class RepoIssues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      username: 'facebook',
      repo: 'react',
      loading: false,
      error: '',
      selectedIssueData: {},
      selectedIssueUrl: '',
      selectedIssueId: ''
    }
  }

  /* 
   * lifecycle hooks
   */
  componentDidMount = () => {
    this.displayIssues(); // load issues when component mounts
  }

  /* 
   * ui actions
   */
  handleSubmit = e => {
    e.preventDefault();
    this.setState({issues: [], loading: true, selectedIssueUrl: '', selectedIssueId: ''});
    this.displayIssues();
  }
  handleChange = e => {
    const un = new RegExp(/Username/, 'g');
    un.test(e.target.id) ? this.setState({username: e.target.value}) : this.setState({repo: e.target.value});
  }
  onIssueSelect = e => {
    e.preventDefault();
    const link = e.currentTarget.dataset.htmlurl;
    const issueId = e.currentTarget.dataset.issueid;
    const issueData = JSON.parse(e.currentTarget.dataset.issuedata);
    return this.setState({
      selectedIssueData: issueData,
      selectedIssueUrl: link,
      selectedIssueId: issueId
    });
  }

  /* 
   * data processing functions
   */
  displayIssues = () => {
    RepoIssueService.getIssues(this.state, response => {
      const {issues, error} = response;
      const issuesResponse = error ? this.setState({error, loading: false}) : this.processIssues(issues);
      return issuesResponse;
    });
  }
  processIssues = issueList => {
    console.log(issueList);
    const issues = issueList.map(issue => {
      const data = {
        title: issue.title,
        id: issue.id,
        html_url: issue.html_url,
        comments: issue.comments,
        user_avatar_url: issue.user.avatar_url,
        user_login: issue.user.login,
        issueData: {
          body: issue.body,
          number: issue.number,
          created_at: issue.created_at
        }
      }
      return data;
    });
    this.setState({issues, loading: false})
  }

  render() {
    const props = {
      issues: this.state.issues,
      loading: this.state.loading,
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      onIssueSelect: this.onIssueSelect,
      username: this.state.username,
      repo: this.state.repo,
      selectedIssueData: this.state.selectedIssueData,
      selectedIssueUrl: this.state.selectedIssueUrl,
      selectedIssueId: this.state.selectedIssueId
    }
    return template(props);
  }
}