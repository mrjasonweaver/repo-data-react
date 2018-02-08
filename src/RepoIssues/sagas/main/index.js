import {select, call, put, takeLatest, fork } from 'redux-saga/effects';
import constants from '../../constants';
import actions from '../../actions';
import utils from '../../utils';

function* getIssueList() {
  try {
    const issueList = yield call(utils.getIssuesData);
    yield put(actions.loadIssueListSuccess(issueList));

  } catch (err) {
    console.log("error in saga", err);
  }
}

export default [getIssueList]