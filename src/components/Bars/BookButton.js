import React from 'react';
import { Button } from 'react-bootstrap';

const BookButton = props => {
  const { user, bookedby, barid, bookBar } = props;
  const booked = user && bookedby && bookedby.indexOf(user.username) > -1;

  if (user && booked) {
    return (
      <Button bsStyle="danger" onClick={() => bookBar(barid, false, user)}>
        Cancel
      </Button>
    );
  } else if (user && !booked) {
    return (
      <Button bsStyle="success" onClick={() => bookBar(barid, true, user)}>
        Book
      </Button>
    );
  } else {
    return null;
  }
};

export default BookButton;
