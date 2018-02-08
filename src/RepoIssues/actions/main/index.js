import constants from '../../constants';

export const loadIssueList = value => {
  return {
    type: constants.LOAD_ISSUES,
    payload: value
  };
}

export const loadIssueListSuccess = issueList => {
  return {
    type: constants.LOAD_ISSUES_SUCCESS,
    payload: issueList
  };
}