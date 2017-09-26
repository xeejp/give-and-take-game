import { ReadJSON } from './ReadJSON'

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
