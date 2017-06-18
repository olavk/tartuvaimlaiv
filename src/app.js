import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './redux/store/configureStore';
import getRootReducer from './redux/modules/getRootReducer';
import App from './App/App';
import './sass/styles.scss';

const rootReducer = getRootReducer();
const store = configureStore(rootReducer);

const node = document.getElementById('react-root');
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), node);
