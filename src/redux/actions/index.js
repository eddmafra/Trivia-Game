export const PLAYER_LOGIN = 'PLAYER_LOGIN';

export const playerLogin = (user) => ({
  type: PLAYER_LOGIN,
  user,
});
