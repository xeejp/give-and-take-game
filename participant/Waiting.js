import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { getGamemodeName } from 'util/index'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ participantsNumber }) => ({
  participantsNumber,
})

const Waiting = ({ participantsNumber }) => (
  <Card>
    <CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["waiting"][0]} />
    <CardText>
      {ReadJSON().static_text["waiting"][1]}
    </CardText>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={2}/>
    </div>
  </Card>
)

export default connect(mapStateToProps)(Waiting)
