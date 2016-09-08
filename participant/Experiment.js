import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Finished from './componets/Finished.js'
import During from './componets/During.js'

import {
  fallSnackBarFlags,
  fallSnackBarFlags2,
} from './actions.js'

import {
  getRoleName,
} from 'util/index'

const mapStateToProps = ({
  pair_state, pair_turn,
  point, role,
  game_progress,
}) => ({
  pair_state, pair_turn,
  point, role,
  game_progress,
})

const styles = {
  chip1: {
    margin: 4,
    float: "left"
  },
  chip2: {
    margin: 4,
    float: "right"
  },
  contents: {
    clear: "both"
  }
}

class Respond extends Component {
  constructor() {
    super()
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestClose2 = this.handleRequestClose2.bind(this)
    this.handleRequestClose3 = this.handleRequestClose3.bind(this)
  }

  handleRequestClose = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags())
  }

  handleRequestClose2 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags2())
  }

  handleRequestClose3 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags3())
  }

  renderContents () {
    const { pair_state } = this.props
    switch(pair_state) {
      case "during":
        return <During />
      case "finished":
        return  <Finished />
    }
  }

  render() {
    const {
      pair_state, pair_turn,
      point, role,
      game_progress,
    } = this.props
    return (
      role != "visitor"?
        <div>
        { pair_state != "finished"?
            <span>
              <Chip style={styles.chip1}>ターン: {pair_turn} / 10</Chip>
              <Chip style={styles.chip1}>{pair_turn == 10? "最後のターン": "残りターン: " + (10 - pair_turn) + "回"}</Chip>
            </span>
          : <Chip style={styles.chip2}>参加者全体の進捗: {Math.round(game_progress)} %</Chip>
        }
        <Chip style={styles.chip2}>ポイント: {point}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


