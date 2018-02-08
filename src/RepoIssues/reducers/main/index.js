import {fromJS} from 'immutable';

import constants from '../../constants';

const initialState = fromJS({
  issues: [],
  username: 'facebook',
  repo: 'react',
  loading: false,
  error: '',
  selectedIssueData: {},
  selectedIssueUrl: '',
  selectedIssueId: '',
  issueDetailsOpen: false
});

function main(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_ISSUES:
      return state.set('loading', true);
    case constants.LOAD_ISSUES_SUCCESS:
      return state.set('loading', false).set('issues', action.payload);
    default:
      return state;
  }
}

export default main;