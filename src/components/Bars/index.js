import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ScrollEvent from 'react-onscroll';
import { getBars } from '../../modules/bars';
import SearchInput from '../SearchInput'
import Bar from './Bar';

import './index.css';

class Bars extends Component {
  componentDidMount() {
    this.addBars();
  }

  addBars() {
    const { offset, location, getBars } = this.props;

    getBars({
      location,
      offset
    });
  }

  onScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
      document.body.scrollHeight
    ) {
      this.addBars();
    }
  }

  render() {
    const { bars } = this.props;

    if (!bars || !bars.length) return <div className="spinner" />;

    return (
      <div
        className="Bars_Container"
        ref={container => {
          this.container = container;
        }}
        onScroll={this.onScroll}
        onClick={() => this.onScroll()}
      >
        <ScrollEvent handleScrollCallback={() => this.onScroll()} />
        <SearchInput />
        <div className="Bars_BarList">
          {bars.map(bar => <Bar key={bar.id} bar={bar} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bars: state.bars.bars,
  offset: state.bars.offset,
  location: state.bars.location
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBars
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Bars);
