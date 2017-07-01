import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import socket from 'utils/socket';
import configureStore from 'reduxroot/store/configureStore';
import getRootReducer from 'modules/getRootReducer';
import mapToDispatch from 'reduxroot/utils/mapToDispatch';
import _setChannels from 'modules/channels/actions/setChannels';
import App from './App/App';
import './sass/styles.scss';

const rootReducer = getRootReducer();
const store = configureStore(rootReducer);

const {dispatch} = store;
const setChannels = mapToDispatch(_setChannels, dispatch);

socket.on('channels', (data) => {
  console.log('got channels', data);
  if (data) {
    const channels = data.channels || [];
    setChannels(channels);
  }
});

const node = document.getElementById('react-root');
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), node);
