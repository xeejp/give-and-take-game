import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  submitGive,
  submitTake,
} from './actions.js'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* submitGiveSaga() {
  while(true) {
    yield take(`${submitGive}`)
    sendData('SUBMIT_GIVE')
  }
}

function* submitTakeSaga() {
  while(true) {
    yield take(`${submitTake}`)
    sendData('SUBMIT_TAKE')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(submitGiveSaga)
  yield fork(submitTakeSaga)
}

export default saga
