import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import { prizes } from 'util/index.js'

const mapStateToProps = ({ pair_turn, role }) => {
  let enemy_role = role == "even"? "odd" : "even"
  const tableData = []
  for(let i = pair_turn-1; i < 10; i++) {
    tableData.push(
      {
        turn: i+1,
        selected: (i+1) == pair_turn,
        self: prizes[role][i],
        enemy: prizes[enemy_role][i],
      }
    )
  }
  tableData.push(
    {
      turn: "10ターンで続行",
      selected: false,
      self: prizes[role][10],
      enemy: prizes[enemy_role][10],
    }
  )
  return {
    tableData
  }
}

class ProfitTable extends Component {
  render() {
    const { tableData } = this.props
    return (
      <div>
        <Table
          height={"150px"}
          fixedHeader={true}
          fixedFooter={false}
          selectable={true}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                利得表
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>ターン</TableHeaderColumn>
              <TableHeaderColumn>あなたの利得</TableHeaderColumn>
              <TableHeaderColumn>相手の利得</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            displayRowCheckbox={false}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{row.turn}</TableRowColumn>
                <TableRowColumn>{row.self}</TableRowColumn>
                <TableRowColumn>{row.enemy}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProfitTable)
