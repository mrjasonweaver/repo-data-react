import constants from '../../constants';

export const loadIssueList = () => {
  return {
    type: constants.LOAD_ISSUES
  };
}

export const loadIssueListSuccess = issueList => {
  return {
    type: constants.LOAD_ISSUES_SUCCESS,
    payload: issueList
  };
}