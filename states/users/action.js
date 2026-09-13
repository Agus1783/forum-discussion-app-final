import api from '../../utils/api';
import { ActionType } from './reducer';

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncReceiveUsers() {
  return async (dispatch) => {
    const users = await api.getAllUsers();

    dispatch(receiveUsersActionCreator(users));

    return users;
  };
}

export {
  receiveUsersActionCreator,
  asyncReceiveUsers,
};
