import { describe, expect, it } from 'vitest';

import {
  ActionType,
  threadsReducer,
} from '../../states/threads/reducer';

describe('threadsReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];

    const nextState = threadsReducer(initialState, {
      type: 'UNKNOWN_ACTION',
    });

    expect(nextState).toEqual([]);
  });

  it('should replace the threads when RECEIVE_THREADS action is dispatched', () => {
    const initialState = [];

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

    const nextState = threadsReducer(initialState, {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads,
      },
    });

    expect(nextState).toEqual(threads);
  });

  it('should add a new thread to the beginning of the state', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Lama',
        body: 'Isi thread lama',
        category: 'general',
        createdAt: '2025-03-11T09:44:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const newThread = {
      id: 'thread-2',
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'react',
      createdAt: '2025-03-12T09:44:00.000Z',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
    };

    const nextState = threadsReducer(initialState, {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    });

    expect(nextState).toEqual([
      newThread,
      ...initialState,
    ]);
  });
});
