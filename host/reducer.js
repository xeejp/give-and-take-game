import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  fallChartButton,
  intoLoading,
  exitLoading,
  updateQuestion,
  updateConfig,
  visit,
} from './actions.js'

const initialState = {
  participants: {},
  pairs: {},
  loading: true,
  results: {},
  chart_turn: 1,
  dynamic_text: null,
}

const reducer = concatenateReducers([
  handleActions({
    [intoLoading]: ({}) => ({ loading: true }),
    [exitLoading]: ({}) => ({ loading: false }),
    'update contents': (_, { payload }) => payload,
    [fallChartButton]: () => ({ chart_button: false}),
    [updateQuestion]: (_, { payload }) => ({ dynamic_text: payload }),
    [updateConfig]: (_, { payload }) => ({ config: payload }),
    [visit]: (_, { payload }) => ({ isFirstVisit: payload }),
  }, initialState),
])

export default reducer
