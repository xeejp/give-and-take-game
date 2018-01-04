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

import { Slider } from 'xee-components'

import { getRoleName } from '../../util/index.js'

import { ReadJSON, InsertVariable } from '../../util/ReadJSON.js'

const mapStateToProps = ({ pair_turn, role, point, dynamic_text, prizes }) => ({
  pair_turn, role, point, dynamic_text, prizes
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
    const { pair_turn, role, select_temp, point, dynamic_text, prizes } = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "even")? "odd" : "even"
    const is_myTurn = role == "even"? pair_turn % 2 == 1 : pair_turn % 2 == 0
    const step_title = []
    for(let i = 0; i < 10; i ++) {
      let imt = role == "even"? (i+1) % 2 == 1 : (i+1) % 2 == 0
      step_title[i] = (
        <Step key={i}>
          <StepLabel>{imt? dynamic_text["you"] : dynamic_text["enemy"]}</StepLabel>
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
            title={InsertVariable(dynamic_text["your_role"], { role: getRoleName(role) })}
            subtitle={is_myTurn? dynamic_text["my_choice"] : InsertVariable(dynamic_text["enemy_choice"], { role: getRoleName(enemy) }) }
          />
          <CardText>
            {is_myTurn?
              <span style={{margin: 4}}>
                <div style={{ position: "relative", marginBottom: "5%"}}>
                  <h4 style={{ position: "absolute",  left: "1%", backgroundColor: "rgba(255,255,255,0.5)" }}>{InsertVariable(ReadJSON().static_text["your_profit_v"], { profit: prizes[role][pair_turn - 1] })}</h4>
                  <h4 style={{ position: "absolute", right: "1%", backgroundColor: "rgba(255,255,255,0.5)" }}>{InsertVariable(ReadJSON().static_text["partner_profit_v"], { profit: prizes[enemy][pair_turn - 1] })}</h4>
                  <div style={{ clear: "both" }}></div>
                  <Slider
                    min={0}
                    max={prizes[role][pair_turn - 1] + prizes[enemy][pair_turn - 1]}
                    divisor={10}
                    value={prizes[role][pair_turn - 1]}
                  />
                </div>
                <RaisedButton style={{float: "left", width: "45%"}}
                  label={InsertVariable(dynamic_text["stop"], { point: point })}
                  secondary={true} onClick={this.handleTake}
                />
                <RaisedButton style={{float: "right", width: "45%"}}
                  label={dynamic_text["continue"]}
                  primary={true} onClick={this.handleGive}
                />
              </span>
            :
              <span style={{margin: 4}}>
                <div style={{ position: "relative", marginBottom: "5%"}}>
                  <h4 style={{ position: "absolute",  left: "1%", backgroundColor: "rgba(255,255,255,0.5)" }}>{InsertVariable(ReadJSON().static_text["your_profit_v"], { profit: prizes[role][pair_turn - 1] })}</h4>
                  <h4 style={{ position: "absolute", right: "1%", backgroundColor: "rgba(255,255,255,0.5)" }}>{InsertVariable(ReadJSON().static_text["partner_profit_v"], { profit: prizes[enemy][pair_turn - 1] })}</h4>
                  <div style={{ clear: "both" }}></div>
                  <Slider
                    min={0}
                    max={prizes[role][pair_turn - 1] + prizes[enemy][pair_turn - 1]}
                    divisor={10}
                    value={prizes[role][pair_turn - 1]}
                  />
                </div>
                <RaisedButton style={{float: "left", width: "45%"}}
                  label={dynamic_text["end"]}
                  secondary={true} disabled={true}/>
                <RaisedButton style={{float: "right", width: "45%"}}
                  label={dynamic_text["continue"]}
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
