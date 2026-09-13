const ActionType = {
  SET_AUTH_USER: 'authUser/setAuthUser'
};

function authUserReducer(state = null, action = {}) {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return action.payload.authUser;
  default:
    return state;
  }
}

export {
  ActionType,
  authUserReducer,
};
