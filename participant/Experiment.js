import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Finished from './componets/Finished.js'
import During from './componets/During.js'

import { ReadJSON, InsertVariable } from '../util/ReadJSON.js'

import {
  getRoleName,
} from '../util/index'

const mapStateToProps = ({
  pair_state, pair_turn,
  point, role,
  game_progress,
  dynamic_text,
}) => ({
  pair_state, pair_turn,
  point, role,
  game_progress,
  dynamic_text,
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
      dynamic_text,
    } = this.props
    return (
      role != "visitor"?
        <div>
        { pair_state != "finished"?
            <span>
              <Chip style={styles.chip1}>{InsertVariable(dynamic_text["turn"], { turn: pair_turn })}</Chip>
              <Chip style={styles.chip1}>{pair_turn == 10? dynamic_text["last_turn"] : InsertVariable(dynamic_text["remain_turn"], { turn: 10 - pair_turn })}</Chip>
            </span>
          : <Chip style={styles.chip2}>{InsertVariable(dynamic_text["all_progress"], { progress: Math.round(game_progress) })}</Chip>
        }
        <Chip style={styles.chip2}>{InsertVariable(dynamic_text["point"], { point: point })}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


