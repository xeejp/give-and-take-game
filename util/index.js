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
  switch(game_pages.indexOf(page)) {
    case 0: return "待機"
    case 1: return "説明"
    case 2: return "実験"
    case 3: return "結果"
  }
}

export function getRoleName(role) {
  switch(role) {
    case "visitor": return "見学者"
    case "even"   : return "奇数ターン"
    case "odd"    : return "偶数ターン"
  }
}

export function getStateName(state) {
  switch(state) {
    case "during"    : return "実験中"
    case "finished"  : return "終了"
  }
}
