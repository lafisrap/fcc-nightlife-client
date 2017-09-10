import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Media, ButtonToolbar, Panel, Image } from 'react-bootstrap';
import { bookBar } from '../../modules/bars';
import Bookings from './Bookings';
import BookButton from './BookButton';

import './Bar.css';

class Bar extends Component {
  render() {
    const { bar, user, bookBar } = this.props;
    const { id, url, image_url, name, rating, price, bookedby, location } = bar;

    return (
      <div className="Bars_Bar">
        <Panel className="Bars_Bar_Panel">
          <Media key={id}>
            <Media.Left>
              <a href={url}>
                <Image
                  width={96}
                  height={96}
                  src={image_url}
                  circle
                  alt={name}
                />
              </a>
            </Media.Left>
            <Media.Body className="Bars_Bar_MediaBody">
              <Media.Heading className="Bars_Bar_Heading">
                {name}
              </Media.Heading>
              <p href={url}>{`Rating: ${rating}`}</p>
              <p href={url}>{`Price: ${price}`}</p>
              <p href={url}>
                {location.display_address.map(line =>
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                )}
              </p>
              <ButtonToolbar>
                <Bookings bookedby={bookedby} />
                <BookButton
                  bookedby={bookedby}
                  barid={id}
                  user={user}
                  bookBar={bookBar}
                />
              </ButtonToolbar>
            </Media.Body>
          </Media>
        </Panel>
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
      bookBar
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
