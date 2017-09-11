import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { showSignup, showSignin, signout } from '../../modules/user';

import './UserArea.css';

class UserArea extends Component {
  render() {
    const { user, showSignin, showSignup, signout } = this.props;

    if (user) {
      return (
        <Nav pullRight>
          <NavDropdown
            eventKey={1}
            title={user.username}
            id="user-nav-dropdown"
          >
            <MenuItem eventKey={1.1} href="#" onClick={() => signout()}>
              Sign Out
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    } else {
      return (
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={() => showSignin(true)}>
            Sign in
          </NavItem>
          <NavItem eventKey={2} href="#" onClick={() => showSignup(true)}>
            Sign up
          </NavItem>
        </Nav>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showSignup,
      showSignin,
      signout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserArea);
