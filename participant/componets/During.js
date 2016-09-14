import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../../util/index.js'

const mapStateToProps = ({ pair_turn, role, point }) => ({
  pair_turn, role, point
})

import {
  submitGive,
  submitTake,
} from '../actions.js'

import ProfitTable from './ProfitTable.js'

class During extends Component {
  constructor() {
    super()
    this.handleGive = this.handleGive.bind(this)
    this.handleTake = this.handleTake.bind(this)
  }

  handleGive = () => {
    const { dispatch }  = this.props
    dispatch(submitGive())
  }

  handleTake = () => {
    const { dispatch }  = this.props
    dispatch(submitTake())
  }

  render() {
    const { pair_turn, role, select_temp, point } = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "even")? "odd" : "even"
    const is_myTurn = role == "even"? pair_turn % 2 == 1 : pair_turn % 2 == 0
    const step_title = []
    for(let i = 0; i < 10; i ++) {
      let imt = role == "even"? (i+1) % 2 == 1 : (i+1) % 2 == 0
      step_title[i] = (
        <Step>
          <StepLabel>{imt? "自分" : "相手"}</StepLabel>
        </Step>
      )
    }
    return (
      <div>
        <Stepper activeStep={pair_turn-1}>
          {step_title}
        </Stepper>
        <Card style={{marginBottom: 12}}>
          <CardHeader
            title={"あなたは" + getRoleName(role) + "側です"}
            subtitle={is_myTurn? "選択してください。" : getRoleName(enemy) + "側が選択中。しばらくお待ちください。" }
          />
          <CardText>
            {is_myTurn?
              <span style={{margin: 4}}>
                <RaisedButton style={{float: "left", width: "45%"}}
                  label={"終了 (" + point + "ポイントで確定)"}
                  secondary={true} onClick={this.handleTake}
                />
                <RaisedButton style={{float: "right", width: "45%"}}
                  label={"続行"}
                  primary={true} onClick={this.handleGive}
                />
              </span>
            :
              <span style={{margin: 4}}>
                <RaisedButton style={{float: "left", width: "45%"}}
                  label="終了"
                  secondary={true} disabled={true}/>
                <RaisedButton style={{float: "right", width: "45%"}}
                  label="続行"
                  primary={true} disabled={true}/>
              </span>
            }
          </CardText>
        </Card>
        <ProfitTable />
      </div>
    )
  }
}

export default connect(mapStateToProps)(During)
