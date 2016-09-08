import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/chip'

import Highcharts from 'react-highcharts'

import { fallChartButton } from 'host/actions.js'

const mapStateToProps = ({ results, role }) => {
  const first_config = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: '1ターン目の選択'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      }
    },
    series: [{
      name: '割合',
      colorByPoint: true,
      data: [
        {
          name: '続行',
          y: 56.33
        },
        {
          name: '終了',
          y: 56.33
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
    title: {
      text: '9ターン目の選択'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      }
    },
    series: [{
      name: '割合',
      colorByPoint: true,
      data: [
        {
          name: '続行',
          y: 56.33
        },
        {
          name: '終了',
          y: 56.33
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
    title: {
      text: '10ターン目の選択'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      }
    },
    series: [{
      name: '割合',
      colorByPoint: true,
      data: [
        {
          name: '続行',
          y: 56.33
        },
        {
          name: '終了',
          y: 56.33
        }
      ]
    }]
  }
  const all_config = {
    chart: { type: "column" },
    credits: { text: 'xee.jp', href: 'https://xee.jp/' },
    title: { text: "終了が選択されたターン" },
    xAxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "最終"],
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
        data: [],
      },
    ],
  }
  return {
    first_config,
    ninth_config,
    tenth_config,
    all_config,
    role
  }
}

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.handleCallback = this.handleCallback.bind(this)
    this.state = {
      expanded: Boolean(role),
      round: 1,
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
    const { first_config, ninth_config, tenth_config, all_config } = this.props

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
          <div>
            <span style={{marginRight: 4, float: "left", width: "30%"}}>
              <Highcharts config={first_config} callback={this.handleCallback}></Highcharts>
              <Highcharts config={ninth_config} callback={this.handleCallback}></Highcharts>
              <Highcharts config={tenth_config} callback={this.handleCallback}></Highcharts>
            </span>
            <span style={{clear: "both"}}>
              <Highcharts config={all_config} callback={this.handleCallback}></Highcharts>
            </span>
          </div>
        </CardText>
      </Card>
    </div>
    )
  }
}

export default connect(mapStateToProps)(Chart)
