import { GRAVATAR_EMAIL, PLAYER_RIGHT_ANSWER, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAR_EMAIL:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.nome,
    };
  case PLAYER_RIGHT_ANSWER:
    return {
      ...state,
      assertions: action.answer,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
