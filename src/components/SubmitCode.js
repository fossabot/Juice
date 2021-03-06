import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

import FileArea from './FileArea'
import Label from './Label'
import MessageContainer from 'containers/MessageContainer'

import { submitCode } from 'redux/modules/submission'

export class SubmitCode extends Component {
  handleLanguageChange = (_event, _index, value) => {
    this.setState({ language: value })
  }

  handleCodeChange = content => {
    this.setState({ code: content.code })
  }

  handleSubmit = () => {
    const { uuid, examId } = this.props
    this.props.submitCode({
      uuid,
      examId,
      ...this.state
    })
  }

  handleClose = () => {
    this.props.goBack()
  }

  render () {
    return (
      <MessageContainer onRequestClose={this.handleClose}>
        <Label label='Language: ' htmlFor='language' />
        <SelectField
          name='language'
          style={styles.margin}
          value={this.state.language}
          onChange={this.handleLanguageChange}>
          <MenuItem value='c' primaryText='C' />
          <MenuItem value='c++' primaryText='C++' />
        </SelectField>
        <FileArea
          fileKey='code'
          textKey='code'
          mode='code'
          onChange={this.handleCodeChange} />
        <FlatButton label='Submit' primary onClick={this.handleSubmit} />
      </MessageContainer>
    )
  }

  state = {
    language: 'c'
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    examId: PropTypes.string,
    submitCode: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }
}

const styles = {
  margin: {
    marginLeft: '5px',
    marginBottom: '5px'
  }
}

export default connect(() => ({}), { submitCode, goBack })(SubmitCode)
