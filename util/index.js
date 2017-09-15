import { ReadJSON } from './ReadJSON'

export const prizes = {
  "even": [0, -1, 2, 1, 4, 3, 6, 5, 8, 7, 10],
  "odd" : [0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10],
}

export const game_pages = [
  "waiting",
  "description",
  "experiment",
  "result"
]

export function getPageName(page) {
  return ReadJSON().static_text["pages"][game_pages.indexOf(page)]
}

export function getRoleName(role) {
  return ReadJSON().static_text["roles"][["visitor", "even", "odd"].indexOf(role)]
}

export function getStateName(state) {
  return ReadJSON().static_text["status"][["during", "finished"].indexOf(page)]
}
