import {SET_CHANNELS} from '../constants';

export default function setChannels(channels) {
  return {
    type: SET_CHANNELS,
    value: channels,
  };
}
