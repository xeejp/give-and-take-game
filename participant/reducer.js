import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  prizes,
} from '../util/index.js'

import {
  changeChartTurn,
  fallChartButton,
  fallSnackBarFlags,
  fallSnackBarFlags2,
} from './actions.js'

const initialState = {
  point: 0,
  role: "visitor",
  pair_id: null,
  chart_turn: 1,
  results: {},
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'show results': (_, { payload }) => ({ results: payload }),
    [changeChartTurn]: (_, { payload }) => ({ chart_turn: payload }),
    [fallChartButton]: () => ({ chart_button: false}),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
