import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import map from 'lodash/map';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class FileButton extends Component {
  @autobind
  handleChange(event) {
    const files = event.target.files;
    if (files.length) {
      const filename = map(files, (file) => {
        return file.name;
      }).join(', ');
      this.setState({ filename });
    } else {
      this.setState({ filename: null });
    }

    if (this.props.onChange) {
      this.props.onChange(files);
    }
  }

  render() {
    return (
      <div>
        <FlatButton
          primary
          label={ this.props.label }
          labelPosition='before'>
          <input type='file'
            style={ styles.file }
            multiple={ this.props.multiple }
            onChange={ this.handleChange } />
        </FlatButton>
        <TextField hintText='Please select file' value={ this.state.filename } />
      </div>
    );
  }

  state = {
    filename: null
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool
  };
}

export default FileButton;

const styles = {
  file: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    minWidth: '100%',
    minHeight: '100%',
    opacity: 0,
    filter: 'alpha(opacity=0)',
    outline: 'none',
    display: 'block'
  }
};
