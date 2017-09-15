import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from 'util/index'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ game_round, game_rate, game_point, dynamic_text }) => ({
  game_round,
  game_rate,
  game_point,
  dynamic_text,
})

class Description extends Component {
  render() {
    const { game_round, game_rate, game_point, dynamic_text } = this.props
    return (
      <Card>
        <CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["desc"]} />
        <CardText>
          <p>{dynamic_text["description"][1]}</p>
          <List>
            <ListItem
              primaryText={dynamic_text["description"][2]}
              secondaryText={dynamic_text["description"][3]}
            />
            <ListItem
              primaryText={dynamic_text["description"][4]}
              secondaryText={dynamic_text["description"][5]}
            />
          </List> 
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
