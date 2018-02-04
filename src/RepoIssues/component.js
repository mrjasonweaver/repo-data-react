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
      loading: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({issues: [], loading: true});
    RepoIssueService.getIssues(this.state, response => {
      return this.setState({issues: response, loading: false});
    });
  }

  handleChange = (e) => {
    const un = new RegExp(/Username/, 'g');
    un.test(e.target.id) ? this.setState({username: e.target.value}) : this.setState({repo: e.target.value});
  }

  render() {
    const props = {
      issues: this.state.issues,
      loading: this.state.loading,
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      username: this.state.username,
      repo: this.state.repo
    }
    return template(props);
  }
}