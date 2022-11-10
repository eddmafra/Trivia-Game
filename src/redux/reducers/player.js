import { SUCCESS_PROFILE } from '../actions';

const INITIAL_STATE = {
  src: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS_PROFILE:
    return {
      ...state,
      src: action.imgSrc,
    };
  default:
    return state;
  }
};

export default playerReducer;
