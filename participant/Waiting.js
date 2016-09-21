import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ participantsNumber }) => ({
  participantsNumber,
})

const Waiting = ({ participantsNumber }) => (
  <Card>
    <CardTitle title="ギブ・アンド・テイクゲーム" subtitle="待機画面" />
    <CardText>
      <p>参加者の登録を待っています。</p>
      <p>この画面のまましばらくお待ち下さい。</p>
      <p>現在{participantsNumber}人が参加しています。 </p>
    </CardText>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={2}/>
    </div>
  </Card>
)

export default connect(mapStateToProps)(Waiting)
