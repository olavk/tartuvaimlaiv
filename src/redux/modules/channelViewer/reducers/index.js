import {SET_ACTIVE_CHANNEL} from '../constants';

const initialState = null;

export default function channels(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_CHANNEL:
      return action.value;
    default:
      return state;
  }
}
