import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Route, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import Home from '../Home';
import UserArea from './UserArea';
import ModalSignup from '../Modals/Signup';
import ModalSignin from '../Modals/Signin';

import './index.css';

const App = props => {
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
          <UserArea />
        </Navbar.Collapse>
        <ModalSignin />
        <ModalSignup />
      </Navbar>
      <main>
        <Route exact path="/" component={Home} />
      </main>
    </div>
  );
};

export default withRouter(App);
