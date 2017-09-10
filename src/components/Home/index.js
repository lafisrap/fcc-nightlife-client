import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Bars from '../Bars';

class Home extends Component {
  render() {
    return (
      <section id="home">
        <Panel>
          <Bars />
        </Panel>
      </section>
    );
  }
}

export default Home;
