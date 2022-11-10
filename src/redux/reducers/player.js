import { GRAVATAR_EMAIL } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
