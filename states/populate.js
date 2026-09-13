import api from '../utils/api';

import { receiveThreadsActionCreator } from './threads/action';
import { receiveUsersActionCreator } from './users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    const [users, threads] = await Promise.all([
      api.getAllUsers(),
      api.getAllThreads(),
    ]);

    dispatch(receiveUsersActionCreator(users));
    dispatch(receiveThreadsActionCreator(threads));

    return {
      users,
      threads,
    };
  };
}

export {
  asyncPopulateUsersAndThreads,
};
