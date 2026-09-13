import api from '../../utils/api';
import { ActionType } from './reducer';

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    const threads = await api.getAllThreads();

    dispatch(receiveThreadsActionCreator(threads));

    return threads;
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    const thread = await api.createThread({
      title,
      body,
      category,
    });

    dispatch(addThreadActionCreator(thread));

    return thread;
  };
}

export {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
};
