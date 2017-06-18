import {SET_INDEX} from '../constants';

export default function setIndex(newIndex) {
  return {
    type: SET_INDEX,
    value: newIndex,
  };
}
