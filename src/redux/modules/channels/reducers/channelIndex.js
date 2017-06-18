import {SET_INDEX} from '../constants';

const initialState = 1;

export default function channelIndex(state = initialState, action) {
  switch (action.type) {
    case SET_INDEX:
      return action.value;
    default:
      return state;
  }
}
