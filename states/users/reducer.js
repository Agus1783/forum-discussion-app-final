const ActionType = {
  RECEIVE_USERS: 'users/receiveUsers',
};

function usersReducer(state = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_USERS:
    return action.payload.users;

  default:
    return state;
  }
}

export {
  ActionType,
  usersReducer,
};
