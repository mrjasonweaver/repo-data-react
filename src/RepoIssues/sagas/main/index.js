import {select, call, put, takeLatest, fork } from 'redux-saga/effects';
import constants from '../../constants';
import actions from '../../actions';
import utils from '../../utils';

function* getIssueList(loadIssueListAction) {
  const urlParams = loadIssueListAction.payload;
  try {
    console.log("getIssueList Saga", urlParams);
    const issueList = yield call(utils.getIssuesData, urlParams);
    console.log("getIssueList Saga after issueList", issueList);
    yield put(actions.loadIssueListSuccess(issueList));

  } catch (err) {
    console.log("error in saga", err);
  }
}

const loadIssueListData = fork(function* () {
  yield takeLatest(constants.LOAD_ISSUES, getIssueList);
})

export default [loadIssueListData]