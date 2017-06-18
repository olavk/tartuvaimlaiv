import {createStore} from 'redux';
import middleware from './middleware';

export default function configureStore(rootReducer, initialState) {
  if (typeof rootReducer !== 'function') {
    throw new Error('configureStore requires a function for rootReducer as first argument');
  }
  return createStore(rootReducer, initialState, middleware);
}
