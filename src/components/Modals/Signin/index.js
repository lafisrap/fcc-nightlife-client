import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Modal,
  Label,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import { showSignin, signin } from '../../../modules/user';

import './index.css';

// check ... class Signup extends ...
class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    };
  }

  handleChange(e, field) {
    const value = { errorMsg: '' };
    value[field] = e.target.value;
    this.setState(value);
  }

  signIn(e) {
    const { signin } = this.props;
    const { username, password } = this.state;

    signin({ username, password }, errorMsg => {
      this.setState({ errorMsg });
    });

    this.setState({
      password: ''
    });
  }

  render() {
    const { showSigninModal, showSignin } = this.props;
    const { errorMsg, username, password } = this.state;

    console.assert(
      typeof errorMsg === 'string',
      'Error messages must be string values.'
    );

    return (
      <div className="static-modal">
        <Modal show={showSigninModal} onHide={() => showSignin(false)}>
          <Modal.Header>
            <Modal.Title>Log into Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="username">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  value={username}
                  placeholder="Enter your name"
                  onChange={e => this.handleChange(e, 'username')}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  value={password}
                  placeholder="Choose a password"
                  onChange={e => this.handleChange(e, 'password')}
                />
                <HelpBlock>Type in name and password ...</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Label bsStyle="danger" className="pull-left">
              {errorMsg}
            </Label>
            <Button onClick={() => showSignin(false)}>Cancel</Button>
            <Button bsStyle="primary" onClick={e => this.signIn(e)}>
              Sign In
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showSigninModal: state.user.showSigninModal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showSignin,
      signin
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
