import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { getBars } from '../../modules/bars'

import './index.css';

const SEARCH_REPEAT = 300;

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      timeout: null
    };
  }

  getValidationState() {
    const { length } = this.state.value;
    if (length > 3) return 'success';
    else return 'error';
  }

  onChange(e) {
    const { value } = e.target;
    const { timeout } = this.state;
    const { getBars } = this.props;

    console.log(4, value, timeout);

    this.setState({ value });

    if( timeout ) clearTimeout( timeout );
    if (this.getValidationState() === 'success') {
      const timeout = setTimeout(() => {
        console.log(4.1, value);
        getBars({
          location: value,
          offset: 0
        });

        this.setState({ timeout: null });
      }, SEARCH_REPEAT);

      this.setState({ timeout });
    }
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formSearchInput"
          validationState={this.getValidationState()}
        >
          <ControlLabel></ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Type an address, e.g. Turiner Straße 21, 13347 Berlin"
            onChange={(e) => this.onChange(e)}
            className="SearchInput_FromControl"
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBars
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(SearchInput);
