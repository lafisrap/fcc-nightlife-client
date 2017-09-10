import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import logo from './logo.svg'
import Home from '../Home'
import About from '../About'
import { showSignup, showSignin, signout } from '../../modules/user'
import ModalSignup from '../Modals/Signup'
import ModalSignin from '../Modals/Signin'

import './index.css'

class App extends Component {
  render() {
    const { user, showSignin, showSignup, signout } = this.props;
    const userArea = user
      ? <Nav pullRight>
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
      : <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={() => showSignin(true)}>
            Sign in
          </NavItem>
          <NavItem eventKey={2} href="#" onClick={() => showSignup(true)}>
            Sign up
          </NavItem>
        </Nav>;

    return (
      <div className="App">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img src={logo} className="App-logo" alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/">
                <NavItem eventKey={1} href="#">
                  Home
                </NavItem>
              </LinkContainer>
            </Nav>
            {userArea}
          </Navbar.Collapse>
          <ModalSignin />
          <ModalSignup />
        </Navbar>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>
      </div>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
