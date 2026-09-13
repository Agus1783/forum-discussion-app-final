const ActionType = {
  RECEIVE_THREADS: 'threads/receiveThreads',
  ADD_THREAD: 'threads/addThread',
};

function threadsReducer(state = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;

  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...state];

  default:
    return state;
  }
}

export {
  ActionType,
  threadsReducer,
};
