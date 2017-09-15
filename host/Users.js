import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { getRoleName, getStateName } from '../util/index.js'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

import { openParticipantPage } from './actions'

const User = ({ id, role, point, pair_id, openParticipantPage }) => (
  <tr><td><a onClick={openParticipantPage(id)}>{id}</a></td>
  <td>{getRoleName(role)}</td>
  <td>{point}</td>
  <td>{pair_id}</td>
  </tr>
)

const UsersList = ({participants, openParticipantPage }) => (
  <table>
    <thead><tr><th>{ReadJSON().static_text["id"]}</th><th>{ReadJSON().static_text["role"]}</th><td>{ReadJSON().static_text["point"]}</td><td>{ReadJSON().static_text["pair_id"]}</td></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            role={participants[id].role}
            point={participants[id].point}
            pair_id={participants[id].pair_id}
            openParticipantPage={openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const Pair = ({ id, pair_turn, pair_state  }) => (
  <tr><td>{id}</td><td>{pair_turn} / 10</td><td>{getStateName(pair_state)}</td></tr>
)

const Pairs = ({ pairs, participants, }) => (
  <table>
    <thead><tr><th>{ReadJSON().static_text["id"]}</th><th>{ReadJSON().static_text["turn"]}</th><th>{ReadJSON().static_text["state"]}</th></tr></thead>
    <tbody>
      {
        Object.keys(pairs).map(id => (
          <Pair
            key={id}
            id={id}
            pair_turn={pairs[id].pair_turn}
            pair_state={pairs[id].pair_state}
          />
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = ({ pairs, participants, game_round, participantsNumber }) => ({
  pairs, participants, game_round, participantsNumber
})

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

const Users = ({ pairs, participants, game_round, openParticipantPage, participantsNumber }) => (
  <div>
    <Card style={{margin: '16px 16px'}}>
      <CardHeader
        title={InsertVariable(ReadJSON().static_text["users"], { users: participantsNumber })}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          openParticipantPage={openParticipantPage}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))
