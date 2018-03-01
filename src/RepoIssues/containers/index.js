import React from 'react';

// Redux libraries and imports
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { loadIssueList, loadIssueListSuccess } from '../actions/main';

// components
import IssuesApp from '../components/IssuesApp';

// services // need to remove
import RepoIssueService from '../RepoIssueService';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      originalIssues: [],
      username: 'facebook',
      repo: 'react',
      loading: false,
      error: '',
      selectedIssueData: {},
      selectedIssueUrl: '',
      selectedIssueId: '',
      issueDetailsOpen: false,
      filterValue: 1
    }
  }

  /* 
   * lifecycle hooks
   */
  componentDidMount = () => this.displayIssues(); // load issues when component mounts

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
  toggleIssueDetails = e => this.setState({issueDetailsOpen: !this.state.issueDetailsOpen});
  handleFilterChange = (e, index, value) => {
    // reset selected state & need to store the filter value
    this.setState({filterValue: value, selectedIssueUrl: '', selectedIssueData: {}});
    if (value === 2) {
      this.setState({issues: this.issuesFiled});
    } else if (value === 3) {
      this.setState({issues: this.prsFiled});
    } else {
      this.setState({issues: this.state.originalIssues});
    }
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
          created_at: issue.created_at,
          isPR: issue.pull_request ? true : false
        }
      }
      return data;
    });
    this.issuesFiled = issues.filter(x => !x.issueData.isPR); // we need an array of issues only
    this.prsFiled = issues.filter(x => x.issueData.isPR); // we need an array of PRs only
    this.setState({issues, originalIssues: issues, loading: false, filterValue: 1})
  }

  render() {
    const props = {
      issues: this.state.issues,
      loading: this.state.loading,
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      onIssueSelect: this.onIssueSelect,
      toggleIssueDetails: this.toggleIssueDetails,
      username: this.state.username,
      repo: this.state.repo,
      selectedIssueData: this.state.selectedIssueData,
      selectedIssueUrl: this.state.selectedIssueUrl,
      selectedIssueId: this.state.selectedIssueId,
      issueDetailsOpen: this.state.issueDetailsOpen,
      filterValue: this.state.filterValue,
      handleFilterChange: this.handleFilterChange
    }
    return IssuesApp(props);
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      loadIssueList,
      loadIssueListSuccess
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);