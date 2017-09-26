import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import { ReadJSON, InsertVariable } from '../../util/ReadJSON'

const mapStateToProps = ({ pair_turn, role, prizes }) => {
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
      turn: ReadJSON().static_text["turn_continue"],
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
                {ReadJSON().static_text["table"]}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>{ReadJSON().static_text["turn"]}</TableHeaderColumn>
              <TableHeaderColumn>{ReadJSON().static_text["your_profit"]}</TableHeaderColumn>
              <TableHeaderColumn>{ReadJSON().static_text["partner_profit"]}</TableHeaderColumn>
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
