const ActionType = {
  RECEIVE_DETAIL_THREAD: 'detailThread/receiveDetailThread',
  CLEAR_DETAIL_THREAD: 'detailThread/clearDetailThread',
};

function detailThreadReducer(state = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_DETAIL_THREAD:
    return action.payload.detailThread;

  case ActionType.CLEAR_DETAIL_THREAD:
    return null;

  default:
    return state;
  }
}

export {
  ActionType,
  detailThreadReducer,
};
