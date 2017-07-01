import {combineReducers} from 'redux';
import * as channelReducers from './channels/reducers';

function getBatchingReducer(reducerToWrap) {
  const batchingReducer = (state, action) => {
    switch (action.type) {
      case 'BATCH_ACTIONS':
        return action.actions.reduce(batchingReducer, state);
      default:
        return reducerToWrap(state, action);
    }
  };
  return batchingReducer;
}

export default function getRootReducer() {
  const combinedReducers = combineReducers({
    channels: combineReducers(channelReducers),
  });
  return getBatchingReducer(combinedReducers);
}
