import {SET_ACTIVE_CHANNEL} from '../constants';

export default function setActiveChannel(channelId) {
  return {
    type: SET_ACTIVE_CHANNEL,
    value: channelId,
  };
};
