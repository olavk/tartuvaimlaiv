import {
  ENABLE_CHANNEL,
  DISABLE_CHANNEL,
  SET_ENABLED_CHANNELS,
} from '../constants';

const initialState = {};

export function enabledChannels(state = initialState, action) {
  switch (action.type) {
    case SET_ENABLED_CHANNELS: {
      return action.enabledChannels;
    }
    case ENABLE_CHANNEL: {
      const newState = {...state};
      newState[action.contentId] = true;
      return newState;
    }
    case DISABLE_CHANNEL: {
      const newState = {...state};
      newState[action.contentId] = false;
      return newState;
    }
    default:
      return state;
  }
}
