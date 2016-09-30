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

import { fallChartButton, changeChartTurn } from 'host/actions.js'

function getFirstGive(results){
  return (results[1] && results[2])?
    results[1].give? results[1].give : 0 + results[2].give? results[2].give : 0
  : 0
}

function getFirstTake(results){
  return (results[1] && results[2])?
    results[1].take? results[1].take : 0 + results[2].take? results[2].take : 0
  : 0
}

function getGive(turn, results) {
  return results[turn]? results[turn].give? results[turn].give : 0  : 0
}

function getTake(turn, results) {
  return results[turn]? results[turn].take? results[turn].take : 0  : 0
}

function compData(results) {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return Array.from(categories).map(turn =>
    results[turn]? results[turn].take? results[turn].take : 0 : 0).concat([
      results[10]? results[10].give? results[10].give : 0 : 0])
}

const mapStateToProps = ({ pairs, results, chart_turn, role }) => {
  const first_config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: { text: "最初の選択" },
    credits: { text: 'xee.jp', href: 'https://xee.jp/' },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
        showInLegend: true
      }
    },
    series: [{
      name: '割合',
      colorByPoint: true,
      data: [
        {
          name: '続行',
          y: getFirstGive(results)
        }, {
          name: '終了',
          y: getFirstTake(results)
        }
      ]
    }]
  }
  const ninth_config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: { text: "9ターンの選択" },
    credits: { text: 'xee.jp', href: 'https://xee.jp/' },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
        showInLegend: true
      }
    },
    series: [{
      name: '割合',
      colorByPoint: true,
      data: [
        {
          name: '続行',
          y: getGive(9, results)
        }, {
          name: '終了',
          y: getTake(9, results)
        }
      ]
    }]
  }
  const tenth_config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: { text: "10ターンの選択" },
    credits: { text: 'xee.jp', href: 'https://xee.jp/' },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
        showInLegend: true
      }
    },
    series: [{
      name: '割合',
      colorByPoint: true,
      data: [
        {
          name: '続行',
          y: getGive(10, results)
        }, {
          name: '終了',
          y: getTake(10, results)
        }
      ]
    }]
  }
  const all_config = {
    chart: { type: "column" },
    credits: { text: 'xee.jp', href: 'https://xee.jp/' },
    title: { text: "終了が選択されたターン" },
    xAxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "終了なし"],
      crosshair: true,
      title: { text: "ターン" },
    },
    yAxis: [
      {
        min: 0,
        title: { text: "ペア数" },
        labels: { step: 1, },
      }
    ],
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + 'ポイント</b><br/>' +
          this.series.name + ': ' + this.y
      }
    },
    series: [
      {
        name: "終了したターン",
        data: compData(results),
      },
    ],
  }
  return {
    first_config,
    ninth_config,
    tenth_config,
    all_config,
    chart_turn,
    role,
  }
}

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.handleCallback = this.handleCallback.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInc = this.handleInc.bind(this)
    this.handleDec = this.handleDec.bind(this)
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

  handleChange = (index, fromIndex) => {
    const { chart_turn, dispatch } = this.props
    const diff = index - fromIndex
    dispatch(changeChartTurn(diff + chart_turn))
  }

  handleInc = () => {
    const { chart_turn, dispatch } = this.props
    dispatch(changeChartTurn(chart_turn + 1))
  }

  handleDec = () => {
    const { chart_turn, dispatch } = this.props
    dispatch(changeChartTurn(chart_turn - 1))
  }

  render() {
    const { first_config, ninth_config, tenth_config, all_config, chart_turn } = this.props
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
          title="グラフ"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <SwipeableViews index={chart_turn-1} onChangeIndex={this.handleChange}>
            <Highcharts config={first_config} />
            <Highcharts config={ninth_config} />
            <Highcharts config={tenth_config} />
          </SwipeableViews>
          <div>
            { chart_turn != 1?
              <IconButton iconStyle={styles.mediumIcon} style={styles.left}
                tooltip="戻る" onClick={this.handleDec}>
                <LeftIcon/>
              </IconButton>
            :
              <IconButton iconStyle={styles.mediumIcon} style={styles.left}
                tooltip="最初の円グラフ">
                <LeftIcon color={grey300}/>
              </IconButton>
            }
            { chart_turn != 3?
              <IconButton iconStyle={styles.mediumIcon} style={styles.right}
                tooltip="進む" onClick={this.handleInc} >
                <RightIcon/>
              </IconButton>
            :
              <IconButton iconStyle={styles.mediumIcon} style={styles.right}
                tooltip="最後の円グラフ">
                <RightIcon color={grey300}/>
              </IconButton>
            }
            <span style={{clear: "both", margin: "auto"}}/>
            <Chip style={{margin: "auto"}}>表示円グラフ: {chart_turn}</Chip>
          </div>
          <Highcharts style={{marginTop: 12}} config={all_config} callback={this.handleCallback}></Highcharts>
        </CardText>
      </Card>
    </div>
    )
  }
}

export default connect(mapStateToProps)(throttle(Chart, 200))
