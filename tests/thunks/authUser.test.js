import { beforeEach, describe, expect, it, vi } from 'vitest';

import api from '../../utils/api';
import {
  asyncLogin,
  setAuthUserActionCreator,
} from '../../states/authUser/action';

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

describe('asyncLogin thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully and dispatch auth user', async () => {
    const loginResult = {
      token: 'dummy-token',
    };

    const authUser = {
      id: 'user-1',
      name: 'Dimas Saputra',
      email: 'dimas@example.com',
      avatar: '',
    };

    api.login.mockResolvedValue(loginResult);
    api.getOwnProfile.mockResolvedValue(authUser);

    const dispatch = vi.fn();

    const result = await asyncLogin({
      email: 'dimas@example.com',
      password: 'password',
    })(dispatch);

    expect(api.login).toHaveBeenCalledWith({
      email: 'dimas@example.com',
      password: 'password',
    });

    expect(api.getOwnProfile).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(authUser),
    );

    expect(result).toEqual(loginResult);
  });

  it('should throw an error when login API fails', async () => {
    const error = new Error('Login gagal');

    api.login.mockRejectedValue(error);

    const dispatch = vi.fn();

    await expect(
      asyncLogin({
        email: 'dimas@example.com',
        password: 'wrong-password',
      })(dispatch),
    ).rejects.toThrow('Login gagal');

    expect(dispatch).not.toHaveBeenCalled();

    expect(api.getOwnProfile).not.toHaveBeenCalled();
  });
});
