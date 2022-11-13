import { combineReducers } from 'redux';
import player from './player';
import tokenReducer from './token';

const rootReducer = combineReducers({
  player,
  tokenReducer,
});

export default rootReducer;
