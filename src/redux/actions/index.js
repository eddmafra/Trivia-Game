import getToken from '../../services/fetchToken';
import getProfile from '../../services/fetchProfile';

export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const ERROR_TOKEN = 'ERROR_TOKEN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const successToken = (payload) => ({
  type: SUCCESS_TOKEN,
  payload,
});

export const errorToken = (error) => ({
  type: ERROR_TOKEN,
  error,
});

export function thunkToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const response = await getToken();
      dispatch(successToken(response));
    } catch (error) {
      dispatch(errorToken(error));
    }
  };
}

export const SUCCESS_PROFILE = 'SUCCESS_PROFILE';
export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const ERROR_PROFILE = 'ERROR_PROFILE';

export const requestProfile = () => ({
  type: REQUEST_PROFILE,
});

export const successProfile = (imgSrc) => ({
  type: SUCCESS_PROFILE,
  imgSrc,
});

export const errorProfile = (error) => ({
  type: ERROR_PROFILE,
  error,
});

export function thunkProfile(hashGerada) {
  return async (dispatch) => {
    dispatch(requestProfile());
    try {
      const response = await getProfile(hashGerada);
      dispatch(successProfile(response));
    } catch (error) {
      dispatch(errorProfile(error));
    }
  };
}
