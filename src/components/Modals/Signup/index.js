import React, { Component } from 'react';
import { push } from 'react-router-redux';
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
import { showSignup, signup } from '../../../modules/user';

import './index.css';

const emailRE = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line no-useless-escape

// check ... class Signup extends ...
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordRepeat: '',
      email: '',
      signupDisabled: false,
      errorMsg: ''
    };
  }

  getValidationState(field) {
    const { username, email, password, passwordRepeat } = this.state;

    switch (field) {
      case 'username':
        if (username.length > 3) return 'success';
        else if (username.length > 0) return 'error';
        break;
      case 'email':
        if (emailRE.test(email)) return 'success';
        else if (email.length > 0) return 'error';
        break;
      case 'password':
        if (!password.length) return;
        else if (password === passwordRepeat) return 'success';
        else return 'error';
      default:
        return;
    }
  }

  handleChange(e, field) {
    const value = { signupDisabled: false, errorMsg: '' };
    value[field] = e.target.value;
    this.setState(value);
  }

  signUp(e) {
    const { signup } = this.props;
    const { username, email, password } = this.state;

    if (
      this.getValidationState('username') === 'success' &&
      this.getValidationState('email') === 'success' &&
      this.getValidationState('password') === 'success'
    ) {
      this.setState({
        signupDisabled: true,
        password: '',
        passwordRepeat: ''
      });

      signup({ username, email, password }, errorMsg => {
        this.setState({ errorMsg });
      });
    }
  }

  render() {
    const { showSignupModal, showSignup } = this.props;
    const {
      signupDisabled,
      errorMsg,
      username,
      email,
      password,
      passwordRepeat
    } = this.state;

    return (
      <div className="static-modal">
        <Modal show={showSignupModal} onHide={() => showSignup(false)}>
          <Modal.Header>
            <Modal.Title>Create an Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup
                controlId="username"
                validationState={this.getValidationState('username')}
              >
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  value={username}
                  placeholder="Enter your name"
                  onChange={e => this.handleChange(e, 'username')}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="email"
                validationState={this.getValidationState('email')}
              >
                <ControlLabel>Email address</ControlLabel>
                <FormControl
                  type="text"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={e => this.handleChange(e, 'email')}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="password"
                validationState={this.getValidationState('password')}
              >
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  value={password}
                  placeholder="Choose a password"
                  onChange={e => this.handleChange(e, 'password')}
                />
                <ControlLabel>Password repeat</ControlLabel>
                <FormControl
                  type="password"
                  value={passwordRepeat}
                  placeholder="Type password again"
                  onChange={e => this.handleChange(e, 'passwordRepeat')}
                />
                <FormControl.Feedback />
                <HelpBlock>Choose a password and type it twice ...</HelpBlock>
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Label bsStyle="danger" className="pull-left">
              {errorMsg}
            </Label>
            <Button onClick={() => showSignup(false)}>Cancel</Button>
            <Button
              bsStyle="primary"
              onClick={e => this.signUp(e)}
              disabled={signupDisabled}
            >
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showSignupModal: state.user.showSignupModal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showSignup,
      signup,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
