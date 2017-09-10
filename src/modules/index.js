import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import bars from './bars';

export default combineReducers({
  routing: routerReducer,
  user,
  bars
});
