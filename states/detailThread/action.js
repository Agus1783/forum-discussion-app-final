import api from '../../utils/api';
import { ActionType } from './reducer';

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    const detailThread = await api.getDetailThread(threadId);

    dispatch(
      receiveDetailThreadActionCreator(detailThread),
    );

    return detailThread;
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    await api.createComment({
      threadId,
      content,
    });

    const detailThread = await api.getDetailThread(threadId);

    dispatch(
      receiveDetailThreadActionCreator(detailThread),
    );

    return detailThread;
  };
}

function voteThread(threadId, voteType) {
  return async (dispatch) => {
    if (voteType === 'up') {
      await api.upVoteThread(threadId);
    } else if (voteType === 'down') {
      await api.downVoteThread(threadId);
    } else if (voteType === 'neutral') {
      await api.neutralVoteThread(threadId);
    } else {
      throw new Error('Jenis vote tidak valid.');
    }

    const detailThread = await api.getDetailThread(threadId);

    dispatch(receiveDetailThreadActionCreator(detailThread));

    return detailThread;
  };
}

export {
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  voteThread
};
