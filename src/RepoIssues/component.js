import React from 'react';
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.getIssues();
  }

  handleChange = (e) => {
    let un = new RegExp(/Username/, 'g');
    un.test(e.target.id) ? this.setState({username: e.target.value}) : this.setState({repo: e.target.value});
  }

  async getIssues() {
    this.setState({issues: [], loading: true});
      try {
        const response = await fetch(`${root}/repos/${this.state.username}/${this.state.repo}/issues`);
        const data = await response.json();
        const issues = data.filter(x => x.comments > 1);
        return this.setState({issues, loading: false});
      } catch(error) {
        console.error(error);
      }
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