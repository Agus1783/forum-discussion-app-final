import { describe, expect, it } from 'vitest';

import {
  ActionType,
  authUserReducer,
} from '../../states/authUser/reducer';

describe('authUserReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;

    const nextState = authUserReducer(initialState, {
      type: 'UNKNOWN_ACTION',
    });

    expect(nextState).toBeNull();
  });

  it('should return the auth user when SET_AUTH_USER action is dispatched', () => {
    const initialState = null;

    const authUser = {
      id: 'user-1',
      name: 'Dimas Saputra',
      email: 'dimas@example.com',
      avatar: '',
    };

    const nextState = authUserReducer(initialState, {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    });

    expect(nextState).toEqual(authUser);
  });
});
