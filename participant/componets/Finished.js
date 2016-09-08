import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import {
  getRoleName,
} from 'util/index'

const mapStateToProps = ({ role }) => ({
  role
})
const Finished = ({ role }) => (() => {
  return (
    <div>
      <Card>
        <CardHeader
          title={getRoleName(role) + "側"}
          subtitle="終了待ち"
        />
        <CardText>
          <p>このペアの実験は終了しました。他のペアが終了するまでお待ち下さい。</p>
        </CardText>
      </Card>
    </div>
  )

})()

export default connect(mapStateToProps)(Finished)
