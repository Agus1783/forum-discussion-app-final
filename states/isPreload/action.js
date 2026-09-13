import { ActionType } from './reducer';

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export {
  setIsPreloadActionCreator,
};
