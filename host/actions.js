import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const changeChartTurn = createAction('CHANGE_CHART_TURN')
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const showResults = createAction('SHOW_RESULTS')

export const match = createAction('MATCH')

export const changePage = createAction('CHANGE_PAGE', page => page)

export const intoLoading = createAction('INTO_LOADING')
export const exitLoading = createAction('EXIT_LOADING')

export const updateQuestion = createAction('UPDATE_QUESTION', dynamic_text => dynamic_text)

export const updateConfig = createAction('UPDATE_CONFIG', config => config)

export const visit = createAction('VISIT')

export const openParticipantPage = createAction('open participant page')
