import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import history from 'utils/history';

const middlewares = [
  thunk,
  routerMiddleware(history),
];

export default applyMiddleware(...middlewares);
