import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchContents,
  intoLoading,
  exitLoading,
  changePage,
} from './actions.js'

import FlatButton from 'material-ui/FlatButton';

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'
import Config from './Config.js'
import EditQuestion from './EditQuestion.js'
import DownloadButton from './DownloadButton'

import { ReadJSON, InsertVariable } from '../util/ReadJSON.js'

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

    componentWillReceiveProps({ pairs, game_page }) {
      if(game_page == "experiment") {
        for(var key in pairs) {
          if(pairs[key].pair_state != "finished") return
        }
        const { dispatch } = this.props
        dispatch(changePage("result"))
      }
    }

  render() {
    const { participants, pairs, results, game_page } = this.props
    return (
      <div>
        <PageSteps />
        <Users />
        <ThrottledChart />
        <Config />
        <EditQuestion style={{marginLeft: "2%"}} disabled={game_page != "waiting"}/>
          <DownloadButton
            fileName={"give_and_take_game.csv"}
            list={[
              [ReadJSON().static_text["title"]],
              [ReadJSON().static_text["file"][0], new Date()],
              [ReadJSON().static_text["file"][1], Object.keys(participants).length],
              [ReadJSON().static_text["file"][2], Object.keys(pairs).length],
              [ReadJSON().static_text["file"][3]],
            ].concat(
              Object.keys(participants).map(id => [id])
            ).concat([
              [""].concat(Array.apply(null, Array(10)).map((t, i) => InsertVariable(ReadJSON().static_text["file"][4], { turn: i + 1 })))
            ]).concat([
              [ReadJSON().static_text["file"][5]].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (i in results && 'give' in results[i])? results[i]['give'] : 0))
            ]).concat([
              [ReadJSON().static_text["file"][6]].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (i in results && 'take' in results[i])? results[i]['take'] : 0))
            ])}
            style={{marginLeft: '2%'}}
            disabled={game_page != "result"}
          />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
