import {SET_CHANNELS} from '../constants';

const initialState = [];

export default function list(state = initialState, action) {
  switch (action.type) {
    case SET_CHANNELS:
      return action.value;
    default:
      return state;
  }
}
