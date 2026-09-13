import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { thunk } from 'redux-thunk';

import { authUserReducer } from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';
import { threadsReducer } from './threads/reducer';
import { usersReducer } from './users/reducer';
import { detailThreadReducer } from './detailThread/reducer';

const rootReducer = combineReducers({
  authUser: authUserReducer,
  isPreload: isPreloadReducer,
  threads: threadsReducer,
  users: usersReducer,
  detailThread: detailThreadReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
