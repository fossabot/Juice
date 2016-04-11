import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import { actions as accountActions } from '../../redux/modules/account';
import { push } from 'react-router-redux';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import CenterBlock from 'layouts/CenterBlock';

export class SigninView extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    fetchUserInfo: PropTypes.func.isRequired,
    setLoginState: PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.props.fetchUserInfo();
    this.checkLoginState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLoginState(nextProps);
  }

  checkLoginState(props) {
    if (props.loginState.get('state')) {
      props.push('/');
    }
  }

  @autobind
  setUsername(event) {
    this.setState({username: event.target.value});
  }

  @autobind
  setPassword(event) {
    this.setState({password: event.target.value});
  }

  @autobind
  login(event) {
    let { username, password } = this.state;
    event.preventDefault();
    this.props.login(username, password);
  }

  render() {
    return (
      <CenterBlock>
        <Paper zDepth={ 3 } style={ Object.assign({}, styles.paper, styles.marginTop) }>
          <Card>
            <CardTitle title='Juice' />
            <CardActions>
              <TextField
                style={ styles.action }
                onChange={ this.setUsername }
                floatingLabelText='Username' />
            </CardActions>
            <CardActions>
              <TextField
                style={ styles.action }
                type='password'
                onChange={ this.setPassword }
                floatingLabelText='Password' />
            </CardActions>
            <CardActions>
              <FlatButton label='Signin' primary onClick={ this.login } />
            </CardActions>
          </Card>
        </Paper>
      </CenterBlock>
    );
  }
}

export default connect((state) => {
  return {loginState: state.account};
}, Object.assign({}, accountActions, { push }))(SigninView);

let styles = {
  paper: {
    width: '100%',
    height: '100%'
  },
  action: {
    width: '80%'
  },
  marginTop: {
    marginTop: '20%'
  }
};
