import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const changeChartTurn = createAction('CHANGE_CHART_TURN')
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const submitGive = createAction('SUBMIT_GIVE')
export const submitTake = createAction('SUBMIT_TAKE')

export const fallSnackBarFlags = createAction('FALL_SNACK_BAR_FLAGS')
export const fallSnackBarFlags2 = createAction('FALL_SNACK_BAR_FLAGS2')
