import { put, take, call, select, fork } from 'redux-saga/effects'

import { delay } from "redux-saga";

import {
  fetchContents,
  match,
  changePage,
  updateQuestion,
  updateConfig,
  visit
} from './actions.js'

import {
  pages,
} from 'util/index'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* matchSaga() {
  while (true) {
    yield take(`${match}`)
    yield call(sendData, 'MATCH')
  }
}

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${changePage}`)
    sendData('CHANGE_PAGE', payload)
    if (payload == 'description') {
      yield put(match())
    }
    if (payload == 'result') {
      const results = yield select(({ results }) => results) 
      sendData('SHOW_RESULTS', results)
    }
  }
}

function* updateQuestionSaga() {
  while(true) {
    const { payload } = yield take(`${updateQuestion}`)
    sendData('UPDATE_QUESTION', payload)
  }
}

function* updateConfigSaga() {
  while(true) {
    const { payload } = yield take(`${updateConfig}`)
    sendData('UPDATE_CONFIG', payload)
  }
}

function* visitSaga() {
  while(true) {
    yield take(`${visit}`)
    sendData('VISIT')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(matchSaga)
  yield fork(changePageSaga)
  yield fork(updateQuestionSaga)
  yield fork(updateConfigSaga)
  yield fork(visitSaga)
}

export default saga
