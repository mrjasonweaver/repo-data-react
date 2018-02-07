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
      selectedIssueUrl: '',
      selectedIssueId: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({issues: [], loading: true, selectedIssueUrl: '', selectedIssueId: ''});
    RepoIssueService.getIssues(this.state, response => {
      const {issues, error} = response;
      const issuesResponse = error ? this.setState({error, loading: false}) : this.setState({issues, loading: false});
      return issuesResponse;
    });
  }

  handleChange = (e) => {
    const un = new RegExp(/Username/, 'g');
    un.test(e.target.id) ? this.setState({username: e.target.value}) : this.setState({repo: e.target.value});
  }

  onIssueSelect = (e) => {
    e.preventDefault();
    const link = e.currentTarget.dataset.htmlurl;
    const issueId = e.currentTarget.dataset.issueid;
    return this.setState({selectedIssueUrl: link, selectedIssueId: issueId});
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
      selectedIssueUrl: this.state.selectedIssueUrl,
      selectedIssueId: this.state.selectedIssueId
    }
    return template(props);
  }
}