import { SUCCESS_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS_TOKEN:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default tokenReducer;
