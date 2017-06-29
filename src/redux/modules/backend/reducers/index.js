import {
  TOGGLE_ENABLED_CHANNEL,
} from '../constants';

function toMap(array) {
  const map = {};
  array.forEach(item => {
    map[item] = true;
  });
  return map;
}

function toArray(map) {
  Object.keys(map).map(key => map[key]).filter(item => item);
}

const initialState = [];

export function enabledChannels(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ENABLED_CHANNEL: {
      const {channel_id} = action;
      const newState = toMap(state);
      newState[channel_id] = !newState[channel_id];
      return toArray(newState);
    }
    default:
      return state;
  }
}
