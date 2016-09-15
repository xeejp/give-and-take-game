import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { reset } from './actions'

const mapStateToProps = ({}) => ({
})

class ResetButton extends Component {
  handleClick() {
    sendData('RESET')
  }

  render() {
    return (
      <RaisedButton
        label="リセット"
        style={{marginRight: "12px", float: "right"}}
        secondary={true}
        onClick={this.handleClick.bind(this)}
      />
    )
  }
}

export default connect(mapStateToProps)(ResetButton)  
