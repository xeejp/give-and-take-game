import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs'
import Paper from 'material-ui/Paper'
import SwipeableViews from 'react-swipeable-views'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import { ReadJSON } from '../util/ReadJSON'

import { updateQuestion, fetchContents } from './actions'

const mapStateToProps = ({ dynamic_text, game_page }) => ({
  dynamic_text, game_page
})

class EditQuestion extends Component {
  constructor(props){
    super(props)
    const { dynamic_text } = this.props
    var default_text = dynamic_text
    var static_text = ReadJSON().static_text
    if(!dynamic_text) {
      default_text = ReadJSON().dynamic_text
      const { dispatch } = this.props
      dispatch(updateQuestion(default_text))
    }
    this.state = {
      static_text: static_text,
      dynamic_text: default_text,
      open: false,
      snack: false,
      message: static_text["send_message"],
      slideIndex: 0,
      mainSlideIndex: 0,
      default_text: ReadJSON().dynamic_text,
    }
  }

  QuestionTab(){
    return (
      <span>
        <TextField
          hintText={ReadJSON().dynamic_text["turn"]}
          defaultValue={this.state.dynamic_text["turn"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["turn"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["remain_turn"]}
          defaultValue={this.state.dynamic_text["remain_turn"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["remain_turn"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["last_turn"]}
          defaultValue={this.state.dynamic_text["last_turn"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["last_turn"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["all_progress"]}
          defaultValue={this.state.dynamic_text["all_progress"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["all_progress"])}
        /><br/>
        <TextField
          hintText={ReadJSON().dynamic_text["me"]}
          defaultValue={this.state.dynamic_text["me"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["me"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["you"]}
          defaultValue={this.state.dynamic_text["you"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["you"])}
        /><br/>
        <TextField
          hintText={ReadJSON().dynamic_text["point"]}
          defaultValue={this.state.dynamic_text["point"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["point"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["your_role"]}
          defaultValue={this.state.dynamic_text["your_role"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["your_role"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["my_choice"]}
          defaultValue={this.state.dynamic_text["my_choice"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["my_choice"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["your_choice"]}
          defaultValue={this.state.dynamic_text["your_choice"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["your_choice"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["stop"]}
          defaultValue={this.state.dynamic_text["stop"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["stop"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["end"]}
          defaultValue={this.state.dynamic_text["end"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["end"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["continue"]}
          defaultValue={this.state.dynamic_text["continue"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["continue"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["side"]}
          defaultValue={this.state.dynamic_text["side"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["side"])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["stay"]}
          defaultValue={this.state.dynamic_text["stay"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["stay"])}
        /><br/>
        <TextField
          hintText={ReadJSON().dynamic_text["finished"]}
          defaultValue={this.state.dynamic_text["finished"]}
          onBlur={this.handleChangeDynamicText.bind(this, ["finished"])}
          fullWidth={true}
          multiLine={true}
        />
      </span>
    )
  }

  DescriptionTab() {
    return (
      <span>
        <TextField
          hintText={ReadJSON().dynamic_text["description"][1]}
          defaultValue={this.state.dynamic_text["description"][1]}
          onBlur={this.handleChangeDynamicText.bind(this, ["description", 1])}
          multiLine={true}
          fullWidth={true}
        />
        <TextField
          hintText={ReadJSON().dynamic_text["description"][2]}
          defaultValue={this.state.dynamic_text["description"][2]}
          onBlur={this.handleChangeDynamicText.bind(this, ["description", 2])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["description"][3]}
          defaultValue={this.state.dynamic_text["description"][3]}
          onBlur={this.handleChangeDynamicText.bind(this, ["description", 3])}
        /><br/>
        <TextField
          hintText={ReadJSON().dynamic_text["description"][4]}
          defaultValue={this.state.dynamic_text["description"][4]}
          onBlur={this.handleChangeDynamicText.bind(this, ["description", 4])}
        />　
        <TextField
          hintText={ReadJSON().dynamic_text["description"][5]}
          defaultValue={this.state.dynamic_text["description"][5]}
          onBlur={this.handleChangeDynamicText.bind(this, ["description", 5])}
        /><br/>
      </span>
    )
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({
      open: true,
      dynamic_text: this.props.dynamic_text,
      mainSlideIndex: 0,
      slideIndex: 0,
    })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChangeDynamicText(value, event){
    var dynamic_text = Object.assign({}, this.state.dynamic_text)
    var temp = dynamic_text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ dynamic_text: dynamic_text })
  }

  handleSlide(value) {
    this.setState({
      slideIndex: value
    })
  }

  handleMainSlide(value){
    this.setState({
      mainSlideIndex: value
    })
  }

  handleRequestClose() {
    this.setState({ snack: false })
  }

  submit() {
    this.setState({
      open: false,
      snack: true,
      message: this.state.static_text["send_message"]
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.dynamic_text))
  }

  reset(){
    this.setState({
      dynamic_text: this.state.default_text,
      open: false,
      snack: true,
      message: this.state.static_text["reset_message"]
    })
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
  }

  render(){
    const { game_page } = this.props
    const actions = [
      <RaisedButton
        label={this.state.static_text["apply"]}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <RaisedButton
        label={this.state.static_text["cancel"]}
        onTouchTap={this.handleClose.bind(this)}
      />,
     <RaisedButton
        label={this.state.static_text["reset"]}
        onTouchTap={this.reset.bind(this)}
      />,
    ]
    return (<span>
      <FloatingActionButton style={{marginLeft: "2%"}} onClick={this.handleOpen.bind(this)} disabled={game_page != "waiting"}>
         <ImageEdit />
      </FloatingActionButton>
      <Dialog
        title={this.state.static_text["editor"]}
        actions={actions}
        modal={false}
        open={this.state.open}
        autoScrollBodyContent={this.state.mainSlideIndex == 1}
      >
        <Tabs
          onChange={this.handleMainSlide.bind(this)}
          value={this.state.mainSlideIndex}
        >
          <Tab label={this.state.dynamic_text["description"][0]} value={0}/>
          <Tab label={this.state.static_text["question"]} value={1}/>
        </Tabs>
        <SwipeableViews
          index={this.state.mainSlideIndex}
          onChangeIndex={this.handleMainSlide.bind(this)}
        >
         {this.DescriptionTab()}
         {this.QuestionTab()}
      </SwipeableViews>
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

export default connect(mapStateToProps)(EditQuestion)