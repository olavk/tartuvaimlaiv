import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import socket from 'utils/socket';
import mapToDispatch from 'reduxroot/utils/mapToDispatch';
import Backend from 'src/Backend/Backend';
import getRootReducer from 'modules/getBackendRootReducer';
import _setEnabledChannels from 'modules/backend/actions/setEnabledChannels';
import configureStore from './redux/store/configureStore';

const rootReducer = getRootReducer();
const store = configureStore(rootReducer);
const rootNode = document.getElementById('react-root');

const {dispatch} = store;
const setEnabledChannels = mapToDispatch(_setEnabledChannels, dispatch);

socket.on('channels', (data) => {
  if (data) {
    const channels = data.channels || [];
    setEnabledChannels(channels.map(obj => obj.contentId));
  }
});

if (rootNode) {
  ReactDOM.render((
    <Provider store={store}>
      <Backend />
    </Provider>
  ), rootNode);
}
