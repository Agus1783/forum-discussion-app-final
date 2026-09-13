import api from '../../utils/api';
import { ActionType } from './reducer';
import { setIsPreloadActionCreator } from '../isPreload/action';

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function asyncLogin({ email, password }) {
  return async (dispatch) => {
    const loginResult = await api.login({
      email,
      password,
    });

    const authUser = await api.getOwnProfile();

    dispatch(setAuthUserActionCreator(authUser));

    return loginResult;
  };
}

function asyncRegister({ name, email, password }) {
  return async () => {
    return api.register({
      name,
      email,
      password,
    });
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = api.getAccessToken();

      if (!token) {
        dispatch(setAuthUserActionCreator(null));
        return;
      }

      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
      api.removeAccessToken();

      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

function asyncLogout() {
  return (dispatch) => {
    api.removeAccessToken();

    dispatch(setAuthUserActionCreator(null));
  };
}

export {
  setAuthUserActionCreator,
  asyncLogin,
  asyncRegister,
  asyncPreloadProcess,
  asyncLogout,
};
