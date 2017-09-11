import axios from 'axios';

export const GET_BARS = 'food/GET_BARS';
export const BOOK_BAR = 'food/BOOK_BAR';

const GET_BARS_LIMIT = 20;

const initialState = {
  bars: [],
  offset: 0,
  location: JSON.parse(localStorage.getItem('barsLocation')) || 'Berlin'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BARS:
      const { payload, offset, location } = action;

      if (offset === GET_BARS_LIMIT) state.bars = [];

      localStorage.setItem('barsLocation', JSON.stringify(location));
      return {
        ...state,
        bars: state.bars.concat(payload),
        offset,
        location
      };

    case BOOK_BAR:
      const { barid, book, username } = action.payload;
      const { bars } = state;

      const bar = bars.find(bar => barid === bar.id);
      const index = bars.indexOf(bar);
      const bookedby = bar.bookedby || [];

      // Add or delete booking
      if (book) {
        bookedby.push(username);
      } else {
        const index = bookedby.indexOf(username);
        if (index > -1) bookedby.splice(index, 1);
      }

      return {
        ...state,
        bars: bars.map((bar, i) => {
          if (i !== index) return bar;
          else return { ...bar, bookedby };
        })
      };

    default:
      return state;
  }
};

export const getBars = ({ location, offset = 0 }) => {
  return dispatch => {
    console.log(5.5, location, offset);
    axios
      .get(
        `${process.env
          .REACT_APP_API_URI}/getbars?location=${location}&offset=${offset}&limit=${GET_BARS_LIMIT}`
      )
      .then(response => {
        if (!response.error) {
          dispatch({
            type: GET_BARS,
            payload: response.data,
            offset: offset + GET_BARS_LIMIT,
            location
          });
        } else {
          console.log(response.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const bookBar = (barid, book, user) => {
  return dispatch => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/${book ? 'bookbar' : 'unbookbar'}`,
        { barid }
      )
      .then(response => {
        if (!response.error) {
          const { username } = user;
          dispatch({
            type: BOOK_BAR,
            payload: { barid, book, username }
          });
        } else {
          console.error(response.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
};
