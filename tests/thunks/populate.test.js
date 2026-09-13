import { beforeEach, describe, expect, it, vi } from 'vitest';

import api from '../../utils/api';

import {
  asyncPopulateUsersAndThreads,
} from '../../states/populate';

import {
  receiveUsersActionCreator,
} from '../../states/users/action';

import {
  receiveThreadsActionCreator,
} from '../../states/threads/action';

vi.mock('../../utils/api', () => ({
  default: {
    getAllUsers: vi.fn(),
    getAllThreads: vi.fn(),
  },
}));

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch users and threads and dispatch both actions', async () => {
    const users = [
      {
        id: 'user-1',
        name: 'Dimas Saputra',
        email: 'dimas@example.com',
        avatar: '',
      },
    ];

    const threads = [
      {
        id: 'thread-1',
        title: 'Belajar React',
        body: 'Bagaimana cara belajar React?',
        category: 'react',
        createdAt: '2025-03-11T09:44:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    api.getAllUsers.mockResolvedValue(users);
    api.getAllThreads.mockResolvedValue(threads);

    const dispatch = vi.fn();

    const result = await asyncPopulateUsersAndThreads()(dispatch);

    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(users),
    );

    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(threads),
    );

    expect(result).toEqual({
      users,
      threads,
    });
  });

  it('should throw an error when fetching data fails', async () => {
    const error = new Error('Gagal mengambil data');

    api.getAllUsers.mockRejectedValue(error);

    const dispatch = vi.fn();

    await expect(
      asyncPopulateUsersAndThreads()(dispatch),
    ).rejects.toThrow('Gagal mengambil data');

    expect(dispatch).not.toHaveBeenCalled();
  });
});
