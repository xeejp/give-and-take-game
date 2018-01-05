import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import {
  getRoleName,
} from '../../util/index'

import { ReadJSON, InsertVariable } from '../../util/ReadJSON'

const mapStateToProps = ({ role, dynamic_text }) => ({
  role,
  dynamic_text,
})
const Finished = ({ role, dynamic_text }) => (() => {
  return (
    <div>
      <Card>
        <CardHeader
          title={InsertVariable(dynamic_text["side"], { role: getRoleName(role) })}
          subtitle={dynamic_text["stay"]}
        />
        <CardText>
          <p>{dynamic_text["finished"]}</p>
        </CardText>
      </Card>
    </div>
  )

})()

export default connect(mapStateToProps)(Finished)
