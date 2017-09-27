import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/chip'

import Highcharts from 'react-highcharts'
import SwipeableViews from 'react-swipeable-views';
import { grey300 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left'

import { fallChartButton } from 'host/actions.js'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const mapStateToProps = ({ pairs, results, role, pairCount }) => {
  var tmp = pairCount
  var rate = Array.apply(null, Array(11)).map((v, key) => {
    var tmp = pairCount
    pairCount -= results[key + 1] && results[key + 1].take && pairCount != 0? results[key + 1].take : 0
    return results[key + 1] && results[key + 1].take && tmp != 0? [key, 100 * results[key + 1].take / tmp] : [key, 0]
  }).filter(v => v)
  if(rate.length != 0) {
    rate.unshift(rate[0].concat())
    rate.push(rate[rate.length - 1].concat())
    rate[0][0] = -1
    rate[rate.length - 1][0] = 12
  }

  var cnt = 0
  var turn = Object.keys(results).map(key => {
    cnt += results[key].take? results[key].take : 0
    return results[key].take? [parseInt(key) - 1, cnt] : null
  }).filter(v => v).concat(results[11] && results[11].give? [10, cnt + results[11].give] : [])
  if(turn.length != 0) {
    turn.unshift(turn[0].concat())
    turn.push(turn[turn.length - 1].concat())
    turn[0][0] = -1
    turn[turn.length - 1][0] = 12
  }

  pairCount = tmp

  var config = {
    chart: {
      alignTicks: false
    },

    title: {
      text: ReadJSON().static_text["chart"]["finish_turn"]
    },

    xAxis: [{
      min: 0,
      max: 10,
      title: {
        text: ReadJSON().static_text["chart"]["turn"]
      },
      labels: {
        formatter: function() { return this.value != 10? InsertVariable(ReadJSON().static_text["chart"]["n_turn"], { turn: this.value + 1 }) : ReadJSON().static_text["chart"]["finish_turn"] }
      },
      tickInterval: 1
    }],

    yAxis: [
      {
        min: 0,
        max: pairCount,
        title: {
          text: ReadJSON().static_text["chart"]["finish_pair"]
        },
        tickInterval: 1
      },
      {
        min: 0,
        max: 100,
        title: {
          text: ReadJSON().static_text["chart"]["finish_rate"]
        },
        opposite: true
      }
    ],
    
    series:[
      {
        yAxis: 1,
        name: ReadJSON().static_text["chart"]["finish_rate"],
        type: "area",
        data: rate,
        step: "left",
        tooltip: {
            valueSuffix: "%"
        }
      },
      {
        yAxis: 0,
        name: ReadJSON().static_text["chart"]["finish_pair"],
        type: "line",
        data: turn,
        step: "left",
        labels: {
          formatter: function() { this.value + "ペア" }
        }
      }
    ]
  }

  return {
    config,
    role,
  }
}

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.handleCallback = this.handleCallback.bind(this)
    this.state = {
      expanded: Boolean(role),
    }
  }

  handleCallback = () => {
    const { dispatch, chart_button } = this.props
    if(chart_button){
      window.setTimeout(() => {
        location.href="#chart"
      }, 1 )
    }
    dispatch(fallChartButton())
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  }

  render() {
    const { config } = this.props
    const styles = {
      mediumIcon: {
        width: 48,
        height: 48,
      },
      left: {
        width: 96,
        height: 96,
        padding: 24,
        float: "left",
      },
      right: {
        width: 96,
        height: 96,
        padding: 24,
        float: "right",
      }
    }
    return (
    <div id="chart">
      <Card
        style={{margin: '16px 16px'}}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={ReadJSON().static_text["chart"]["graph"]}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Highcharts style={{marginTop: 12}} config={config} callback={this.handleCallback}></Highcharts>
        </CardText>
      </Card>
    </div>
    )
  }
}

export default connect(mapStateToProps)(throttle(Chart, 200))
