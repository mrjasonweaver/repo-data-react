import constants from '../../constants';

export const loadIssueList = () => {
  return {
    type: constants.LOAD_ISSUE_LIST
  };
}

export const loadIssueListSuccess = issueList => {
  return {
    type: constants.LOAD_ISSUE_LIST_SUCCESS,
    payload: issueList
  };
}