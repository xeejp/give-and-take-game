import React, { Component } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import { ReadJSON } from '../util/ReadJSON'

import { updateConfig, fetchContents, visit } from './actions'

const mapStateToProps = ({ config, game_page, isFirstVisit }) => ({
  config, game_page, isFirstVisit
})

class Config extends Component {
  constructor(props){
    super(props)
    const { config } = this.props
    this.state = {
      config: config? config : [[0, -1, 2], [0, 3, 2]],
      open: false,
      snack: false,
      disabled: false,
      message: ReadJSON().static_text["send_message"],
      default_config: [[0, -1, 2], [0, 3, 2]],
    }
  }

  config() {
    const { config, default_config } = this.state
    return (<div>
      {ReadJSON().static_text["config"][1][0]}
      <br/>
      <TextField
        hintText={default_config[0][0] + ""}
        floatingLabelText={ReadJSON().static_text["config"][2][0]}
        value={config[0][0]}
        onChange={this.handleChangeDynamicText.bind(this, [0, 0])}
      />　
      <TextField
        hintText={default_config[0][1] + ""}
        floatingLabelText={ReadJSON().static_text["config"][2][1]}
        value={config[0][1]}
        onChange={this.handleChangeDynamicText.bind(this, [0, 1])}
      />　
      <TextField
        hintText={default_config[0][2] + ""}
        floatingLabelText={ReadJSON().static_text["config"][2][2]}
        value={config[0][2]}
        onChange={this.handleChangeDynamicText.bind(this, [0, 2])}
      /><br/><br/>
      {ReadJSON().static_text["config"][1][1]}
      <br/>
      <TextField
        hintText={default_config[1][1] + ""}
        floatingLabelText={ReadJSON().static_text["config"][2][0]}
        value={config[1][1]}
        onChange={this.handleChangeDynamicText.bind(this, [1, 1])}
      />　
      <TextField
        hintText={default_config[1][0] + ""}
        floatingLabelText={ReadJSON().static_text["config"][2][1]}
        value={config[1][0]}
        onChange={this.handleChangeDynamicText.bind(this, [1, 0])}
      />　
      <TextField
        hintText={default_config[1][2] + ""}
        floatingLabelText={ReadJSON().static_text["config"][2][2]}
        value={config[1][2]}
        onChange={this.handleChangeDynamicText.bind(this, [1, 2])}
      />
    </div>)
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({
      open: true,
      config: this.props.config,
    })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChangeDynamicText(value, event){
    var config = this.state.config.concat()
    var temp = config
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    if(event.target.value == '0-' && value[value.length - 1] != 2) temp[value[value.length - 1]] = '-'
    else if(event.target.value == '0x' || event.target.value == '-') temp[value[value.length - 1]] = 0
    else temp[value[value.length - 1]] = (event.target.value.length > 0)? parseInt(event.target.value) : 0
    this.setState({
      config: config,
      disabled: !(config[0][0] >= config[0][1] && config[1][1] >= config[1][0] && config[0][2] > 0 && config[1][2] > 0)
    })
  }

  handleRequestClose() {
    this.setState({ snack: false })
  }

  submit() {
    this.setState({
      open: false,
      snack: true,
      message: ReadJSON().static_text["send_message"]
    })
    const { dispatch } = this.props
    dispatch(updateConfig(this.state.config))
  }

  reset(){
    this.setState({
      dynamic_text: this.state.default_text,
      open: false,
      snack: true,
      message: ReadJSON().static_text["reset_message"]
    })
    const { dispatch } = this.props
    dispatch(updateConfig(this.state.default_config))
  }

  componentWillReceiveProps({ isFirstVisit }) {
    if(isFirstVisit) {
      this.setState({ open: true })
      const { dispatch } = this.props
      dispatch(visit())
    }
  }

  render(){
    const { game_page } = this.props
    const actions = [
      <RaisedButton
        label={ReadJSON().static_text["apply"]}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
        disabled={this.state.disabled}
      />,
      <RaisedButton
        label={ReadJSON().static_text["cancel"]}
        onTouchTap={this.handleClose.bind(this)}
      />,
     <RaisedButton
        label={ReadJSON().static_text["reset"]}
        onTouchTap={this.reset.bind(this)}
      />,
    ]
    return (<span>
      <FloatingActionButton style={{marginLeft: "2%"}} onClick={this.handleOpen.bind(this)} disabled={game_page != "waiting"}>
         <ActionSettings />
      </FloatingActionButton>
      <Dialog
        title={ReadJSON().static_text["config"][0]}
        actions={actions}
        modal={false}
        open={this.state.open}
        autoScrollBodyContent={true}
      >
        {this.config()}
      </Dialog>
      <Snackbar
        open={this.state.snack}
        message={this.state.message}
        autoHideDuration={2000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    </span>)
  }
}

export default connect(mapStateToProps)(Config)