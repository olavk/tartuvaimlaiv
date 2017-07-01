import {SET_ENABLED_CHANNELS} from '../constants';

export default function setEnabledChannels(contentIds = []) {
  const enabledChannels = {};
  contentIds.forEach(contentId => {
    enabledChannels[contentId] = true;
  });
  return {
    type: SET_ENABLED_CHANNELS,
    enabledChannels,
  };
}
