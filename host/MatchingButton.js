import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

import { match } from './actions'

const mapStateToProps = ({}) => ({
})

class MatchingButton extends Component {
  handleClick() {
    const { dispatch } = this.props
    dispatch(match())
  }

  render() {
    return (
      <RaisedButton
        label="再マッチング"
        style={{marginRight: "12px"}}
        onClick={this.handleClick.bind(this)}
      />
    )
  }
}

export default connect(mapStateToProps)(MatchingButton)  
