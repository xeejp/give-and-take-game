import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_round, game_rate, game_point }) => ({
  game_round,
  game_rate,
  game_point,
})

class Description extends Component {
  render() {
    const { game_round, game_rate, game_point } = this.props
    return (
      <Card>
        <CardTitle title="ギブ・アンド・テイクゲーム" subtitle="ルールの説明" />
        <CardText>
          <p>あなたは誰かとペアになって実験を行います。<br/>
          参加者はそれぞれ偶数ターン側か奇数ターン側かに分かれています。</p>
          <p>参加者はそれぞれポイントを持っています。<br/>
          自分のターンになると、2つの選択を行います。</p>
          <List>
            <ListItem
              primaryText="続行"
              secondaryText="次のターンに行く"
            />
            <ListItem
              primaryText="終了"
              secondaryText="現在のターンで終了しポイントを確定する"
            />
          </List> 
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
