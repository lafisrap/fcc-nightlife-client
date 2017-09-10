import React from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';

const Bookings = props => {
  const { bookedby } = props;
  const button =
    !bookedby || !bookedby.length
      ? <SplitButton
          title="No bookings yet."
          dropup
          disabled
          id="split-button-dropup"
        />
      : <SplitButton
          title={`${bookedby.length} going.`}
          dropup
          id="split-button-dropup"
        >
          {bookedby.map((username, i) =>
            <MenuItem key={username} eventKey={i + 1}>
              {username}
            </MenuItem>
          )}
        </SplitButton>;

  return button;
};

export default Bookings;
