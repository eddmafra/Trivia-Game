import { combineReducers } from 'redux';
import playerReducer from './player';
import tokenReducer from './token';

const rootReducer = combineReducers({
  playerReducer,
  tokenReducer,
});

export default rootReducer;
