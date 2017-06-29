import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Backend from 'src/Backend/Backend';
import getRootReducer from 'modules/getBackendRootReducer';
import configureStore from './redux/store/configureStore';

const rootReducer = getRootReducer();
const store = configureStore(rootReducer);
const rootNode = document.getElementById('react-root');

if (rootNode) {
  ReactDOM.render((
    <Provider store={store}>
      <Backend />
    </Provider>
  ), rootNode);
}
