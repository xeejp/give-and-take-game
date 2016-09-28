import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchContents,
  intoLoading,
  exitLoading,
} from './actions.js'

import FlatButton from 'material-ui/FlatButton';

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'
import MatchingButton from './MatchingButton.js'
import DownloadButton from './DownloadButton'

import throttle from 'react-throttle-render'

const ThrottledChart = throttle(Chart, 200)

const mapStateToProps = ({ dispatch, participants, pairs, results, game_page }) => ({
  dispatch, participants, pairs, results, game_page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(intoLoading())
    dispatch(fetchContents())
    dispatch(exitLoading())
  }

  render() {
    const { participants, pairs, results, game_page } = this.props
    return (
      <div>
        <PageSteps />
        <Users />
        <ThrottledChart />
        <MatchingButton />
          <DownloadButton
            fileName={"give_and_take_game.csv"}
            list={[
              ["ギブアンドテイクゲーム"],
              ["実験日", new Date()],
              ["登録者数", Object.keys(participants).length],
              ["ペア数", Object.keys(pairs).length],
              ["ID"],
            ].concat(
              Object.keys(participants).map(id => [id])
            ).concat([
              ["", "1ターン", "2ターン", "3ターン", "4ターン", "5ターン", "6ターン", "7ターン", "8ターン", "9ターン", "10ターン"]
            ]).concat([
              ["give"].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (i in results && 'give' in results[i])? results[i]['give'] : 0))
            ]).concat([
              ["take"].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (i in results && 'take' in results[i])? results[i]['take'] : 0))
            ])}
            style={{marginLeft: '2%'}}
            disabled={game_page != "result"}
          />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
