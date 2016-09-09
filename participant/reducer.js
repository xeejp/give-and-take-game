import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  prizes,
} from '../util/index.js'

import {
  changeChartTurn,
  fallChartButton,
  submitGive,
  submitTake,
  fallSnackBarFlags,
  fallSnackBarFlags2,
} from './actions.js'

const initialState = {
  point: 0,
  role: "visitor",
  pair_id: null,
  chart_turn: 1,
  results: {},
  participants_length: 0,
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'sync game progress': (_, { payload }) => ({ game_progress: payload }),
    'sync participants length': (_, { payload }) => ({ participants_length: payload }),

    'change page': (_, { payload }) => ({ game_page: payload }),

    'reseted': () => ({
      game_page: "waiting", role: "visitor", point: 0, pair_id: null, pair_turn: 1, pair_state: "during"
    }),
    'show results': (_ , { payload }) => ({
      results: payload,
    }),

    [submitGive]: ({ pair_turn, role }, {}) => ({
      pair_turn: pair_turn < 10? pair_turn+1 : pair_turn,
      pair_state: pair_turn < 10? "during" : "finished",
      point: pair_turn < 10? prizes[role][pair_turn] : prizes[role][10]
    }),
    'submit give': ({ pair_turn, role }, {}) => ({
      pair_turn: pair_turn < 10? pair_turn+1 : pair_turn,
      pair_state: pair_turn < 10? "during" : "finished",
      point: pair_turn < 10? prizes[role][pair_turn] : prizes[role][10]
    }),
    [submitTake]: ({ pair_turn, role }, {}) => ({
      pair_state: "finished",
      point: prizes[role][pair_turn-1]
    }),
    'submit take': ({ pair_turn, role }, {}) => ({
      pair_state: "finished",
      point: prizes[role][pair_turn-1]
    }),

    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, { [id]: participant })
    }),
    'matched': (_, { payload: {
      members, pair_turn, pair_id, point, results, role, pair_state
    } }) => ({
      members, pair_turn, pair_id, point, results, role, pair_state
    }),

    [fallSnackBarFlags]: ({ pair_state }) => ({  }),
    [fallSnackBarFlags2]: ({}) => ({ change_role_flag: false }),
    [changeChartTurn]: (_, { payload }) => ({ chart_turn: payload }),
    [fallChartButton]: () => ({ chart_button: false}),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
